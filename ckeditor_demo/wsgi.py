from __future__ import absolute_import

import os

from django.core.wsgi import get_wsgi_application

"""
WSGI config for ckeditor_demo project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/howto/deployment/wsgi/
"""


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ckeditor_demo.settings")

application = get_wsgi_application()
