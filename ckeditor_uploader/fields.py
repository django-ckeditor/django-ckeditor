from ckeditor import fields

from . import widgets


class RichTextUploadingField(fields.RichTextField):
    def formfield(self, **kwargs):
        defaults = {
            "form_class": RichTextUploadingFormField,
        }
        defaults.update(kwargs)
        return super().formfield(**defaults)


class RichTextUploadingFormField(fields.RichTextFormField):
    widget = widgets.CKEditorUploadingWidget
