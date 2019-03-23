from __future__ import absolute_import, unicode_literals

import hashlib
import os.path
import shutil
from datetime import datetime

from django.conf import settings


def get_upload_directory():
    date_path = datetime.now().strftime('%Y/%m/%d')

    # Complete upload path (upload_path + date_path).
    upload_path = os.path.join(
        settings.CKEDITOR_UPLOAD_PATH, date_path)
    return os.path.join(settings.MEDIA_ROOT, upload_path)


def get_media_url(fname):
    args = [
        settings.CKEDITOR_UPLOAD_PATH,
        datetime.now().strftime('%Y/%m/%d'),
        fname
    ]
    return settings.MEDIA_URL + "/".join(arg.strip('/') for arg in args)


def remove_upload_directory():
    # Called on test setup
    # Avoid falling in the use case chere django append a hash to the file name
    # to prevent file collisions
    shutil.rmtree(get_upload_directory(), ignore_errors=True)


def sha1(path):
    image = open(path, 'rb')
    fhash = hashlib.sha1()
    fhash.update(image.read())
    return fhash.hexdigest()


def get_absolute_media_path(fname):
    upload_directory = get_upload_directory()
    return os.path.join(upload_directory, fname)
