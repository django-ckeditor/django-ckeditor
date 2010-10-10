import os
from datetime import datetime

from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
            
try: 
    from PIL import Image, ImageOps 
except ImportError: 
    import Image, ImageOps

try:
    from django.views.decorators.csrf import csrf_exempt
except ImportError:
    # monkey patch this with a dummy decorator which just returns the same function
    # (for compatability with pre-1.1 Djangos)
    def csrf_exempt(fn):
        return fn
        
THUMBNAIL_SIZE = (75, 75)
    
def get_available_name(name):
    """
    Returns a filename that's free on the target storage system, and
    available for new content to be written to.
    """
    dir_name, file_name = os.path.split(name)
    file_root, file_ext = os.path.splitext(file_name)
    # If the filename already exists, keep adding an underscore (before the
    # file extension, if one exists) to the filename until the generated
    # filename doesn't exist.
    while os.path.exists(name):
        file_root += '_'
        # file_ext includes the dot.
        name = os.path.join(dir_name, file_root + file_ext)
    return name

def get_thumb_filename(file_name):
    """
    Generate thumb filename by adding _thumb to end of filename before . (if present)
    """
    return '%s_thumb%s' % os.path.splitext(file_name)

def create_thumbnail(filename):
    image = Image.open(filename)
        
    # Convert to RGB if necessary
    # Thanks to Limodou on DjangoSnippets.org
    # http://www.djangosnippets.org/snippets/20/
    if image.mode not in ('L', 'RGB'):
        image = image.convert('RGB')
       
    # scale and crop to thumbnail
    imagefit = ImageOps.fit(image, THUMBNAIL_SIZE, Image.ANTIALIAS)
    imagefit.save(get_thumb_filename(filename))
        
def get_media_url(path):
    """
    Determine system file's media URL.
    """
    upload_prefix = getattr(settings, "CKEDITOR_UPLOAD_PREFIX", None)
    if upload_prefix:
        url = upload_prefix + path.replace(settings.CKEDITOR_UPLOAD_PATH, '')
    else:
        url = settings.MEDIA_URL + path.replace(settings.MEDIA_ROOT, '')
   
    # Remove any double slashes.
    return url.replace('//', '/')

@csrf_exempt
def upload(request):
    """
    Uploads a file and send back its URL to CKEditor.

    TODO:
        Validate uploads
    """
    # get the upload from request
    upload = request.FILES['upload']
    upload_ext = os.path.splitext(upload.name)[1]
    
    # dir to put uploaded file
    sort_dir = datetime.now().strftime('%Y/%m/%d')
    
    # complete upload path (upload_path + sort_dir)
    upload_path = os.path.join(settings.CKEDITOR_UPLOAD_PATH, sort_dir)
    
    # make sure sort_dir exists
    if not os.path.exists(upload_path):
        os.makedirs(upload_path)
    
    # determine destination filename
    destination_filename = get_available_name(os.path.join(upload_path, upload.name))
     
    # iterate through chunks and write to destination
    destination = open(destination_filename, 'wb+')
    for chunk in upload.chunks():
        destination.write(chunk)
    destination.close()

    create_thumbnail(destination_filename)

    url = get_media_url(destination_filename)

    # respond with javascript sending ckeditor upload url.
    return HttpResponse("""
    <script type='text/javascript'>
        window.parent.CKEDITOR.tools.callFunction(%s, '%s');
    </script>""" % (request.GET['CKEditorFuncNum'], url))

def get_image_browse_urls():
    """
    Recursively walks all dirs under upload dir and generates a list of
    thumbnail and full image URL's for each file found.
    """
    images = []
    
    for root, dirs, files in os.walk(settings.CKEDITOR_UPLOAD_PATH):
        for filename in [ os.path.join(root, x) for x in files ]:
            # bypass for thumbs
            if '_thumb' in filename:
                continue
            
            images.append({
                'thumb': get_media_url(get_thumb_filename(filename)),
                'src': get_media_url(filename)
            })

    return images
    
def browse(request):
    context = RequestContext(request, {
        'images': get_image_browse_urls(),
        'media_prefix': settings.CKEDITOR_MEDIA_PREFIX,
    })
    return render_to_response('browse.html', context)
