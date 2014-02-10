from django import VERSION
django_version = VERSION[0]*100 + VERSION[1]

if django_version < 106:
    from django.conf.urls.defaults import patterns, url
else:
    from django.conf.urls import patterns, url    

urlpatterns = patterns(
    '',
    url(r'^upload/', 'ckeditor.views.upload', name='ckeditor_upload'),
    url(r'^browse/', 'ckeditor.views.browse', name='ckeditor_browse'),
)
