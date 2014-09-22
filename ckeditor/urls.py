from django.conf.urls import patterns, url
from django.contrib.admin.views.decorators import staff_member_required

from ckeditor import views

urlpatterns = patterns(
    '',
    url(r'^upload/', staff_member_required(views.upload), name='ckeditor_upload'),
    url(r'^browse/', staff_member_required(views.browse), name='ckeditor_browse'),
)
