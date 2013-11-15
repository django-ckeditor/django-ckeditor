from datetime import datetime
import mimetypes
import os
import io
import sys

from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template.defaultfilters import slugify
from django.template import RequestContext

try:
    from PIL import Image, ImageOps
except ImportError:
    import Image
    import ImageOps


THUMBNAIL_SIZE = (75, 75)

CKEDITOR_UPLOAD_SLUGIFY_FILENAME = getattr(settings,
                                           "CKEDITOR_UPLOAD_SLUGIFY_FILENAME",
                                           True)


def is_image(filepath):
    image = default_storage.open(filepath)
    try:
        Image.open(image)
    except IOError:
        return False
    else:
        return True


def slugify_filename(filename):
    u""" Slugify filename """
    name, ext = os.path.splitext(filename)
    return slugify(name) + ext


def get_available_name(name):
    """
    Returns a filename that's free on the target storage system, and
    available for new content to be written to.
    """
    return default_storage.get_available_name(name)


def get_thumb_filename(file_name):
    """
    Generate thumb filename by adding _thumb to end of
    filename before . (if present)
    """
    return '{0}_thumb{1}'.format(*os.path.splitext(file_name))


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
    thumbnail_io = io.StringIO()
    if sys.version_info >= (3, 0):
        handle = str(thumbnail_io)
    else:
        handle = unicode(thumbnail_io)
    imagefit.save(handle, format=pil_format)

    thumbnail = InMemoryUploadedFile(
        thumbnail_io,
        None,
        thumbnail_filename,
        thumbnail_format,
        len(thumbnail_io.getvalue()),
        None)
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
    upload_path = os.path.join(
        settings.CKEDITOR_UPLOAD_PATH, user_path, date_path)

    if CKEDITOR_UPLOAD_SLUGIFY_FILENAME:
        upload_name = slugify_filename(upload_name)

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
    saved_path = default_storage.save(upload_filename, upload)

    if is_image(saved_path):
        create_thumbnail(saved_path)

    url = get_media_url(saved_path)

    # Respond with Javascript sending ckeditor upload url.
    return HttpResponse("""
    <script type='text/javascript'>
        window.parent.CKEDITOR.tools.callFunction({0}, '{1}');
    </script>""".format(request.GET['CKEditorFuncNum'], url))


def get_image_files(user=None, path=''):
    """
    Recursively walks all dirs under upload dir and generates a list of
    full paths for each file found.
    """
    # If a user is provided and CKEDITOR_RESTRICT_BY_USER is True,
    # limit images to user specific path, but not for superusers.
    STORAGE_DIRECTORIES = 0
    STORAGE_FILES = 1

    restrict = getattr(settings, 'CKEDITOR_RESTRICT_BY_USER', False)
    if user and not user.is_superuser and restrict:
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
