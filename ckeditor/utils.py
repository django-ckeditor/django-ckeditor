import mimetypes
import os.path

from django.core.files.storage import default_storage
from django.template.defaultfilters import slugify


def slugify_filename(filename):
    u""" Slugify filename """
    name, ext = os.path.splitext(filename)
    return slugify(name) + ext


def get_thumb_filename(file_name):
    """
    Generate thumb filename by adding _thumb to end of
    filename before . (if present)
    """
    return '{0}_thumb{1}'.format(*os.path.splitext(file_name))


def get_image_format(extension):
    mimetypes.init()
    return mimetypes.types_map[extension]


def get_media_url(path):
    """
    Determine system file's media URL.
    """
    return default_storage.url(path)
