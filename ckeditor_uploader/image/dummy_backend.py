from __future__ import absolute_import

from ckeditor_uploader import utils


def create_thumbnail(file_path, format):
    raise NotImplementedError


def should_create_thumbnail(file_path):
    return False


def image_verify(file_object):
    if not utils.is_valid_image_extension(file_object.name):
        raise utils.NotAnImageException
