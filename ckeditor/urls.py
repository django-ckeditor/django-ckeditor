from django.conf.urls import patterns, url

urlpatterns = patterns(
    '',
    url(r'^upload/', 'ckeditor.views.upload', name='ckeditor_upload'),
    url(r'^browse/', 'ckeditor.views.browse', name='ckeditor_browse'),
)
