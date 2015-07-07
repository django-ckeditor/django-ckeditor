import mimetypes
import os.path
import random
import re
import string

from django.conf import settings
from django.core.files.storage import default_storage
from django.template.defaultfilters import slugify
from django.utils.encoding import force_text


# Non-image file icons, matched from top to bottom
fileicons_path = '{}/file-icons/'.format(getattr(settings, 'CKEDITOR_FILEICONS_PATH', '/static/ckeditor'))
CKEDITOR_FILEICONS = getattr(settings, 'CKEDITOR_FILEICONS', [
    ('\.pdf$', fileicons_path + 'pdf.png'),
    ('\.doc$|\.docx$|\.odt$', fileicons_path + 'doc.png'),
    ('\.txt$', fileicons_path + 'txt.png'),
    ('\.ppt$', fileicons_path + 'ppt.png'),
    ('\.xls$', fileicons_path + 'xls.png'),
    ('.*', fileicons_path + 'file.png'), # Default
])


class NotAnImageException(Exception):
    pass


def slugify_filename(filename):
    """ Slugify filename """
    name, ext = os.path.splitext(filename)
    slugified = get_slugified_name(name)
    return slugified + ext


def get_slugified_name(filename):
    slugified = slugify(filename)
    return slugified or get_random_string()


def get_random_string():
    return ''.join(random.sample(string.ascii_lowercase * 6, 6))


def get_icon_filename(file_name):
    """
    Return the path to a file icon that matches the file name.
    """
    for regex, iconpath in CKEDITOR_FILEICONS:
        if re.search(regex, file_name, re.I):
            return iconpath


def get_thumb_filename(file_name):
    """
    Generate thumb filename by adding _thumb to end of
    filename before . (if present)
    """
    return force_text('{0}_thumb{1}').format(*os.path.splitext(file_name))


def get_image_format(extension):
    mimetypes.init()
    return mimetypes.types_map[extension.lower()]


def get_media_url(path):
    """
    Determine system file's media URL.
    """
    return default_storage.url(path)
