from django.core.urlresolvers import reverse

from ckeditor import widgets


class CKEditorUploadingWidget(widgets.CKEditorWidget):
    def _set_config(self):
        if 'filebrowserUploadUrl' not in self.config:
            self.config.setdefault('filebrowserUploadUrl', reverse('ckeditor_upload'))
        if 'filebrowserBrowseUrl' not in self.config:
            self.config.setdefault('filebrowserBrowseUrl', reverse('ckeditor_browse'))
        super(CKEditorUploadingWidget, self)._set_config()
