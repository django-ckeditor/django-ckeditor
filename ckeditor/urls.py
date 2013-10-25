from ckeditor.settings import CKEDITOR_BROWSEABLE_UPLOADED_IMAGES
from django.conf.urls import patterns, url


urlpatterns = patterns('',
    url(r'^upload/', 'ckeditor.views.upload', name='ckeditor_upload'),
)

if CKEDITOR_BROWSEABLE_UPLOADED_IMAGES:
    urlpatterns += patterns('',
        url(r'^browse/', 'ckeditor.views.browse', name='ckeditor_browse'),
    )
