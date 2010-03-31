from django.db import models
from django import forms

from ckeditor.widgets import CKEditorWidget

class RichTextField(models.TextField):
    def formfield(self, **kwargs):
        defaults = {
            'form_class': RichTextFormField,
            'widget': CKEditorWidget,
        }
        defaults.update(kwargs)
        return super(RichTextField, self).formfield(**defaults)
        

class RichTextFormField(forms.fields.Field):
    widget = CKEditorWidget

    def __init__(self, *args, **kwargs):
        kwargs.update({'widget': CKEditorWidget})
        super(RichTextFormField, self).__init__(*args, **kwargs)
