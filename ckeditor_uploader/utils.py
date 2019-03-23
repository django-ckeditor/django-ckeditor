from __future__ import absolute_import

import os.path
import random
import re
import string

from django.conf import settings
from django.template.defaultfilters import slugify
from django.utils.encoding import force_text
from django.utils.module_loading import import_string

# Non-image file icons, matched from top to bottom

fileicons_path = '{0}/file-icons/'.format(getattr(settings, 'CKEDITOR_FILEICONS_PATH', '/static/ckeditor'))
# This allows adding or overriding the default icons used by Gallerific by getting an additional two-tuple list from
# the project settings.  If it does not exist, it is ignored.  If the same file extension exists twice, the settings
# file version is used instead of the default.
override_icons = getattr(settings, 'CKEDITOR_FILEICONS', [])
ckeditor_icons = [
    (r'\.pdf$', fileicons_path + 'pdf.png'),
    (r'\.doc$|\.docx$|\.odt$', fileicons_path + 'doc.png'),
    (r'\.txt$', fileicons_path + 'txt.png'),
    (r'\.ppt$', fileicons_path + 'ppt.png'),
    (r'\.xls$', fileicons_path + 'xls.png'),
    ('.*', fileicons_path + 'file.png'),  # Default
]
CKEDITOR_FILEICONS = override_icons + ckeditor_icons

IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif'}


# Allow for a custom storage backend defined in settings.
def get_storage_class():
    return import_string(getattr(settings, 'CKEDITOR_STORAGE_BACKEND', 'django.core.files.storage.DefaultStorage'))()


storage = get_storage_class()


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


def get_media_url(path):
    """
    Determine system file's media URL.
    """
    return storage.url(path)


def is_valid_image_extension(file_path):
    extension = os.path.splitext(file_path.lower())[1]
    return extension in IMAGE_EXTENSIONS
