import os

from django.conf import settings
from django.core.exceptions import ImproperlyConfigured

__version__ = "4.0.6-dive-ckeditor-20140401" # update this when deploying new version to production

if 'ckeditor' in settings.INSTALLED_APPS:
    # Confirm CKEDITOR_UPLOAD_PATH setting has been specified.
    try:
        settings.CKEDITOR_UPLOAD_PATH
    except AttributeError:
        raise ImproperlyConfigured("django-ckeditor requires \
                CKEDITOR_UPLOAD_PATH setting. This setting specifies an \
                absolute path to your ckeditor media upload directory. Make \
                sure you have write permissions for the path, i.e.: \
                CKEDITOR_UPLOAD_PATH = '/home/media/media.lawrence.com/\
                uploads'")

    # If a CKEDITOR_UPLOAD_PATH settings has been specified, confirm it exists.
    if getattr(settings, 'CKEDITOR_UPLOAD_PATH', None):
        if not os.path.exists(settings.CKEDITOR_UPLOAD_PATH):
            raise ImproperlyConfigured("django-ckeditor CKEDITOR_UPLOAD_PATH \
                    setting error, no such file or directory: '%s'" % \
                    settings.CKEDITOR_UPLOAD_PATH)
