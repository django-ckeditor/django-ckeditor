import os

from django.conf import settings
from django.http import HttpResponse
    
def exists(name):
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
    upload = request.FILES['upload']
    destination_filename = get_available_name(os.path.join(settings.CKEDITOR_UPLOAD_PATH, upload.name))
     
    destination = open(destination_filename, 'wb+')
    for chunk in upload.chunks():
        destination.write(chunk)
    destination.close()

    # XXX: very flaky, needs some tlc
    url = settings.MEDIA_URL + destination_filename.split(settings.MEDIA_ROOT)[1]

    return HttpResponse("""
    <script type='text/javascript'>
        window.parent.CKEDITOR.tools.callFunction(%s, '%s');
    </script>""" % (request.GET['CKEditorFuncNum'], url))
