import django

if float("%d.%d"%(django.VERSION[0],django.VERSION[1])) < 1.5:
    from django.conf.urls.defaults import patterns,url
else:    
    from django.conf.urls import patterns,url

urlpatterns = patterns(
    '',
    url(r'^upload/', 'ckeditor.views.upload', name='ckeditor_upload'),
    url(r'^browse/', 'ckeditor.views.browse', name='ckeditor_browse'),
)
