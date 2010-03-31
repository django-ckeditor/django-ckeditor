import os

from django.conf import settings
from django.http import HttpResponse
    
def exists(name):
    """
    Determines wether or not a file exists on the target storage system.
    """
    return os.path.exists(name)

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
    while exists(name):
        file_root += '_'
        # file_ext includes the dot.
        name = os.path.join(dir_name, file_root + file_ext)
    return name

def upload(request):
    """
    Uploads a file and send back its URL to CKEditor.

    TODO:
        Validate uploads
    """
    # get the upload from request
    upload = request.FILES['upload']

    # determine destination filename
    destination_filename = get_available_name(os.path.join(settings.CKEDITOR_UPLOAD_PATH, upload.name))
     
    # iterate through chunks and write to destination
    destination = open(destination_filename, 'wb+')
    for chunk in upload.chunks():
        destination.write(chunk)
    destination.close()

    # determine uploaded file's media url
    # XXX: very flaky, needs some tlc
    url = settings.MEDIA_URL + destination_filename.split(settings.MEDIA_ROOT)[1]

    # respond with javascript sending ckeditor upload url.
    return HttpResponse("""
    <script type='text/javascript'>
        window.parent.CKEDITOR.tools.callFunction(%s, '%s');
    </script>""" % (request.GET['CKEditorFuncNum'], url))
