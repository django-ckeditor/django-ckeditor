import django
if django.VERSION[0:2] >= (1, 4):
    from django.conf.urls import patterns, url
else:
    from django.conf.urls.defaults import patterns, url

urlpatterns = patterns(
    '',
    url(r'^upload/', 'ckeditor.views.upload', name='ckeditor_upload'),
    url(r'^browse/', 'ckeditor.views.browse', name='ckeditor_browse'),
)
