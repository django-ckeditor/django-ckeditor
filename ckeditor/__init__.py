import os

from django.conf import settings
from django.core.exceptions import ImproperlyConfigured
from django.core.urlresolvers import reverse, NoReverseMatch

if 'ckeditor' in settings.INSTALLED_APPS:
    # Confirm ckeditor urls have been included.
    try:
        reverse('ckeditor_upload')
    except NoReverseMatch:
        raise ImproperlyConfigured("django-ckeditor requires ckeditor.urls to be included in the project's urls.py file: (r'^ckeditor/', include('ckeditor.urls'))")

    # Confirm CKEDITOR_MEDIA_PREFIX setting has been specified.
    try:                
        settings.CKEDITOR_MEDIA_PREFIX
    except AttributeError:
        raise ImproperlyConfigured("django-ckeditor requires CKEDITOR_MEDIA_PREFIX setting. This setting specifies a URL prefix to the ckeditor JS and CSS media (not uploaded media). Make sure to use a trailing slash: CKEDITOR_MEDIA_PREFIX = '/media/ckeditor/'")
    
    # Confirm CKEDITOR_UPLOAD_PATH setting has been specified.
    try:                
        settings.CKEDITOR_UPLOAD_PATH
    except AttributeError:
        raise ImproperlyConfigured("django-ckeditor requires CKEDITOR_UPLOAD_PATH setting. This setting specifies an absolute path to your ckeditor media upload directory. Make sure you have write permissions for the path, i.e.: CKEDITOR_UPLOAD_PATH = '/home/media/media.lawrence.com/uploads'")

    # If a CKEDITOR_UPLOAD_PATH settings has been specified, confirm it exists.
    if getattr(settings, 'CKEDITOR_UPLOAD_PATH', None):
        if not os.path.exists(settings.CKEDITOR_UPLOAD_PATH):
            raise ImproperlyConfigured("django-ckeditor CKEDITOR_UPLOAD_PATH setting error, no such file or directory: '%s'" % settings.CKEDITOR_UPLOAD_PATH)
