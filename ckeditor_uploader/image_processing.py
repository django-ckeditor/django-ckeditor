from __future__ import absolute_import

from django.conf import settings


def get_backend():
    backend = getattr(settings, "CKEDITOR_IMAGE_BACKEND", None)

    if backend == "pillow":
        from ckeditor_uploader.image import pillow_backend as backend
    else:
        from ckeditor_uploader.image import dummy_backend as backend
    return backend
