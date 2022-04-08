from django import forms

from ckeditor.fields import RichTextFormField
from ckeditor.widgets import CKEditorWidget
from ckeditor_uploader.fields import RichTextUploadingFormField
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from .widgets import CkEditorMultiWidget


class CkEditorForm(forms.Form):
    ckeditor_standard_example = RichTextFormField()
    ckeditor_upload_example = RichTextUploadingFormField(
        config_name="my-custom-toolbar"
    )


class CkEditorMultiWidgetForm(forms.Form):
    SUBWIDGET_SUFFIXES = ["0", "1"]

    ckeditor_standard_multi_widget_example = RichTextFormField(
        widget=CkEditorMultiWidget(
            widgets={suffix: CKEditorWidget for suffix in SUBWIDGET_SUFFIXES},
        ),
    )
    ckeditor_upload_multi_widget_example = RichTextUploadingFormField(
        config_name="my-custom-toolbar",
        widget=CkEditorMultiWidget(
            widgets={
                suffix: CKEditorUploadingWidget(config_name="my-custom-toolbar")
                for suffix in SUBWIDGET_SUFFIXES
            },
        ),
    )
