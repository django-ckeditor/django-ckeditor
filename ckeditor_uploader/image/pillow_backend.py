from __future__ import absolute_import

import os
from io import BytesIO

from django.conf import settings
from django.core.files.uploadedfile import InMemoryUploadedFile
from ckeditor_uploader.utils import storage

from PIL import Image, ImageOps

from ckeditor_uploader import utils

THUMBNAIL_SIZE = getattr(settings, "THUMBNAIL_SIZE", (75, 75))


def image_verify(f):
    try:
        Image.open(f).verify()
    except IOError:
        raise utils.NotAnImageException


def create_thumbnail(file_path):
    thumbnail_filename = utils.get_thumb_filename(file_path)
    thumbnail_format = utils.get_image_format(os.path.splitext(file_path)[1])

    image = storage.open(file_path)
    image = Image.open(image)
    file_format = image.format

    # Convert to RGB if necessary
    # Thanks to Limodou on DjangoSnippets.org
    # http://www.djangosnippets.org/snippets/20/
    if image.mode not in ('L', 'RGB'):
        image = image.convert('RGB')

    # scale and crop to thumbnail
    imagefit = ImageOps.fit(image, THUMBNAIL_SIZE, Image.ANTIALIAS)
    thumbnail_io = BytesIO()
    imagefit.save(thumbnail_io, format=file_format)

    thumbnail = InMemoryUploadedFile(
        thumbnail_io,
        None,
        thumbnail_filename,
        thumbnail_format,
        len(thumbnail_io.getvalue()),
        None)
    thumbnail.seek(0)

    return storage.save(thumbnail_filename, thumbnail)


def should_create_thumbnail(file_path):
    image = storage.open(file_path)
    try:
        Image.open(image)
    except IOError:
        return False
    else:
        return utils.is_valid_image_extension(file_path)
