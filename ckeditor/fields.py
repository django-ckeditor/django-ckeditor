from django.db import models
from django import forms

from ckeditor.widgets import CKEditorWidget

import django.utils.safestring

class RichTextField(models.TextField):
    __metaclass__ = models.SubfieldBase

    def __init__(self, config_name='default', *args, **kwargs):
        self.config_name = config_name
        super(RichTextField, self).__init__(*args, **kwargs)

    def formfield(self, **kwargs):
        defaults = {
            'form_class': RichTextFormField,
            'config_name': self.config_name,
        }
        defaults.update(kwargs)
        return super(RichTextField, self).formfield(**defaults)

    def to_python(self, value):
        value = super(RichTextField, self).to_python(value)
        return django.utils.safestring.mark_safe(value)



class RichTextFormField(forms.fields.Field):
    def __init__(self, config_name='default', *args, **kwargs):
        kwargs.update({'widget': CKEditorWidget(config_name=config_name)})
        super(RichTextFormField, self).__init__(*args, **kwargs)
