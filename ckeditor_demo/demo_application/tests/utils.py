import hashlib
import os.path
import shutil
from datetime import datetime
from typing import Any, Dict

from django.conf import settings

from ckeditor.configs import DEFAULT_CONFIG


def get_upload_directory():
    date_path = datetime.now().strftime("%Y/%m/%d")

    # Complete upload path (upload_path + date_path).
    upload_path = os.path.join(settings.CKEDITOR_UPLOAD_PATH, date_path)
    return os.path.join(settings.MEDIA_ROOT, upload_path)


def get_media_url(fname):
    args = [settings.CKEDITOR_UPLOAD_PATH, datetime.now().strftime("%Y/%m/%d"), fname]
    return settings.MEDIA_URL + "/".join(arg.strip("/") for arg in args)


def remove_upload_directory():
    # Called on test setup
    # Avoid falling in the use case chere django append a hash to the file name
    # to prevent file collisions
    shutil.rmtree(get_upload_directory(), ignore_errors=True)


def sha1(path):
    image = open(path, "rb")
    fhash = hashlib.sha1()
    fhash.update(image.read())
    return fhash.hexdigest()


def get_absolute_media_path(fname):
    upload_directory = get_upload_directory()
    return os.path.join(upload_directory, fname)


def get_absolute_name(class_or_function):
    return f"{class_or_function.__module__}.{class_or_function.__name__}"


def get_config(config_name):
    return {
        **DEFAULT_CONFIG,
        **settings.CKEDITOR_CONFIGS[config_name],
    }


def get_contexts_for_widgets(response) -> Dict[str, Dict[str, Any]]:
    """
    Searches through the response's context for subcontexts of widgets,
    and returns a dictionary with the widgets' `id` attribute as key
    and the widget's context dictionary as value.
    """
    widget_contexts = {}
    for subcontext in response.context:
        if "widget" not in subcontext:
            continue

        for subcontext_dict in subcontext:
            if type(subcontext_dict) is not dict or "widget" not in subcontext_dict:
                continue

            widget = subcontext_dict["widget"]
            widget_id = widget["attrs"]["id"]
            widget_contexts[widget_id] = subcontext_dict

    return widget_contexts
