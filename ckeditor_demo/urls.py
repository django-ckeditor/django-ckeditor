from __future__ import absolute_import

from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin

from .demo_application.views import ckeditor_form_view

urlpatterns = (
    [
        url(r"^$", ckeditor_form_view, name="ckeditor-form"),
        url(r"^admin/", admin.site.urls),
        url(r"^ckeditor/", include("ckeditor_uploader.urls")),
    ]
    + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
)
