import os.path

from ckeditor import utils


def create_thumbnail(file_path, format):
    raise NotImplementedError


def should_create_thumbnail(file_path):
    return False


def image_verify(file_object):
    valid_extensions = ['.jpeg', '.jpg', '.gif', '.png']
    _, extension = os.path.splitext(file_object.name)
    if not extension.lower() in valid_extensions:
        raise utils.NotAnImageException
