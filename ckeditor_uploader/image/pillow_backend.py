from __future__ import absolute_import

import os
from io import BytesIO

from django.core.files.storage import default_storage
from django.core.files.uploadedfile import InMemoryUploadedFile

from ckeditor_uploader import utils

try:
    from PIL import Image, ImageOps
except ImportError:
    import Image
    import ImageOps


THUMBNAIL_SIZE = (75, 75)


def image_verify(f):
    try:
        Image.open(f).verify()
    except IOError:
        raise utils.NotAnImageException


def create_thumbnail(file_path):
    thumbnail_filename = utils.get_thumb_filename(file_path)
    thumbnail_format = utils.get_image_format(os.path.splitext(file_path)[1])

    image = default_storage.open(file_path)
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

    return default_storage.save(thumbnail_filename, thumbnail)


def is_image(file_path):
    image = default_storage.open(file_path)
    try:
        Image.open(image)
    except IOError:
        return False
    else:
        return utils.is_valid_image_extension(file_path)

        
def resize_uploaded_image(file_path, image_longest_side):
    # if settings CKEDITOR_SAVED_IMAGE_LENGTH_MAX as string
    image_longest_side = int(image_longest_side)
    # adding _resized to filename
    resizing_filename = utils.get_resize_filename(file_path)
    # read image from saved_path
    image = default_storage.open(file_path)
    image = Image.open(image)
    img_format = image.format

    # set image size (from settings CKEDITOR_SAVED_IMAGE_LENGTH_MAX)
    width, height = image.size
    proportion = width/height
    if width > height:
        new_width = image_longest_side
        new_height = new_width/proportion
    else:
        new_height = image_longest_side
        new_width = new_height*proportion
 
    resizedImage = image.resize((int(new_width), int(new_height)), Image.ANTIALIAS)
    resizedImageFile = BytesIO()
    resizedImage.save(resizedImageFile, img_format)

    # create InMemoryUploadedFile image object
    resized_image = InMemoryUploadedFile(resizedImageFile, None, resizing_filename, img_format, len(resizedImageFile.getvalue()), None)
    resizedImageFile.seek(0)
    
    return default_storage.save(resizing_filename, resized_image)