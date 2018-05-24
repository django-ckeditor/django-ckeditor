from __future__ import absolute_import

from django import forms

from ckeditor.fields import RichTextFormField


class CkEditorForm(forms.Form):
    content = RichTextFormField()
