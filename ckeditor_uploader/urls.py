from __future__ import absolute_import

from django.urls import re_path
from django.contrib.admin.views.decorators import staff_member_required
from django.views.decorators.cache import never_cache

from . import views

urlpatterns = [
    re_path(r"^upload/", staff_member_required(views.upload), name="ckeditor_upload"),
    re_path(
        r"^browse/",
        never_cache(staff_member_required(views.browse)),
        name="ckeditor_browse",
    ),
]
