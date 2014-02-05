from datetime import datetime
import mimetypes
import os
import re
import StringIO
from urlparse import urlparse, urlunparse

from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext

try:
    from PIL import Image, ImageOps
except ImportError:
    import Image
    import ImageOps

try:
    from django.views.decorators.csrf import csrf_exempt
except ImportError:
    # monkey patch this with a dummy decorator which just returns the
    # same function (for compatability with pre-1.1 Djangos)
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
    while default_storage.exists(name):
        file_root += '_'
        # file_ext includes the dot.
        name = os.path.join(dir_name, file_root + file_ext)
    return name


def get_thumb_filename(file_name):
    """
    Generate thumb filename by adding _thumb to end of
    filename before . (if present)
    """
    return '%s_thumb%s' % os.path.splitext(file_name)

def get_image_format(extension):
    mimetypes.init()
    return mimetypes.types_map[extension]

def create_thumbnail(filename):
    thumbnail_filename = get_thumb_filename(filename)
    thumbnail_format = get_image_format(os.path.splitext(filename)[1])
    pil_format = thumbnail_format.split('/')[1]

    image = default_storage.open(filename)
    image = Image.open(image)

    # Convert to RGB if necessary
    # Thanks to Limodou on DjangoSnippets.org
    # http://www.djangosnippets.org/snippets/20/
    if image.mode not in ('L', 'RGB'):
        image = image.convert('RGB')

    # scale and crop to thumbnail
    imagefit = ImageOps.fit(image, THUMBNAIL_SIZE, Image.ANTIALIAS)
    thumbnail_io = StringIO.StringIO()
    imagefit.save(thumbnail_io, format=pil_format)

    thumbnail = InMemoryUploadedFile(thumbnail_io, None, thumbnail_filename, thumbnail_format,
                                  thumbnail_io.len, None)
    thumbnail.seek(0)

    return default_storage.save(thumbnail_filename, thumbnail)


def get_media_url(path):
    """
    Determine system file's media URL.
    """
    return default_storage.url(path)


def get_upload_filename(upload_name, user):
    # If CKEDITOR_RESTRICT_BY_USER is True upload file to user specific path.
    if getattr(settings, 'CKEDITOR_RESTRICT_BY_USER', False):
        user_path = user.username
    else:
        user_path = ''

    # Generate date based path to put uploaded file.
    date_path = datetime.now().strftime('%Y/%m/%d')

    # Complete upload path (upload_path + date_path).
    upload_path = os.path.join(settings.CKEDITOR_UPLOAD_PATH, user_path, \
            date_path)

    return get_available_name(os.path.join(upload_path, upload_name))


@csrf_exempt
def upload(request):
    """
    Uploads a file and send back its URL to CKEditor.

    TODO:
        Validate uploads
    """
    # Get the uploaded file from request.
    upload = request.FILES['upload']

    # Open output file in which to store upload.
    upload_filename = get_upload_filename(upload.name, request.user)

    image = default_storage.save(upload_filename, upload)

    create_thumbnail(image)

    # Respond with Javascript sending ckeditor upload url.
    url = get_media_url(image)
    return HttpResponse("""
    <script type='text/javascript'>
        window.parent.CKEDITOR.tools.callFunction(%s, '%s');
    </script>""" % (request.GET['CKEditorFuncNum'], url))


def get_image_files(user=None, path=''):
    """
    Recursively walks all dirs under upload dir and generates a list of
    full paths for each file found.
    """
    # If a user is provided and CKEDITOR_RESTRICT_BY_USER is True,
    # limit images to user specific path, but not for superusers.
    STORAGE_DIRECTORIES = 0
    STORAGE_FILES = 1

    if user and not user.is_superuser and getattr(settings, \
            'CKEDITOR_RESTRICT_BY_USER', False):
        user_path = user.username
    else:
        user_path = ''

    browse_path = os.path.join(settings.CKEDITOR_UPLOAD_PATH, user_path, path)

    try:
        storage_list = default_storage.listdir(browse_path)
    except NotImplementedError:
        return
    except OSError:
        return

    for filename in storage_list[STORAGE_FILES]:
        if os.path.splitext(filename)[0].endswith('_thumb'):
            continue
        filename = os.path.join(browse_path, filename)
        yield filename

    for directory in storage_list[STORAGE_DIRECTORIES]:
        directory_path = os.path.join(path, directory)
        for element in get_image_files(path=directory_path):
            yield element


def get_image_browse_urls(user=None):
    """
    Recursively walks all dirs under upload dir and generates a list of
    thumbnail and full image URL's for each file found.
    """
    images = []
    for filename in get_image_files(user=user):
        images.append({
            'thumb': get_media_url(get_thumb_filename(filename)),
            'src': get_media_url(filename)
        })

    return images


def browse(request):
    context = RequestContext(request, {
        'images': get_image_browse_urls(request.user),
    })
    return render_to_response('browse.html', context)
