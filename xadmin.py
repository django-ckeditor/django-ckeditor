# coding:utf-8
# ckeditor Xadmin plugin

import xadmin
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.conf import settings
from django.db.models import TextField
from xadmin.views import BaseAdminPlugin, ModelFormAdminView, DetailAdminView

from extra_apps.ckeditor_uploader.fields import RichTextUploadingField


class XadminCKEditorWidget(CKEditorUploadingWidget):
    def __init__(self,**kwargs):
        self.ueditor_settings=kwargs
        self.Media.js = None
        super(XadminCKEditorWidget, self).__init__(kwargs)


class CKEditorPlugin(BaseAdminPlugin):

    def get_field_style(self, attrs, db_field, style, **kwargs):
        if style == 'ckeditor':
            if isinstance(db_field, RichTextUploadingField):
                return {'widget': XadminCKEditorWidget(**db_field.formfield().widget.attrs)}
            if isinstance(db_field, TextField):
                return {'widget': XadminCKEditorWidget}
        return attrs

    def block_extrahead(self, context, nodes):
        js = '<script type="text/javascript" src="%s"></script>' % (settings.STATIC_URL + "ckeditor/ckeditor/ckeditor.js")
        nodes.append(js)


xadmin.site.register_plugin(CKEditorPlugin, DetailAdminView)
xadmin.site.register_plugin(CKEditorPlugin, ModelFormAdminView)
