from django import forms

from ckeditor.fields import RichTextFormField


class CkEditorForm(forms.Form):
    content = RichTextFormField()
