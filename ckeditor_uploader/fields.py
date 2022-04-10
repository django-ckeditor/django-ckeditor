from django import forms

from ckeditor import fields
from ckeditor_uploader import widgets


class RichTextUploadingField(fields.RichTextField):
    def formfield(self, **kwargs):
        kwargs["form_class"] = RichTextUploadingFormField
        return super().formfield(**kwargs)


class RichTextUploadingFormField(forms.fields.CharField):
    def __init__(
        self,
        config_name="default",
        extra_plugins=None,
        external_plugin_resources=None,
        *args,
        **kwargs
    ):
        kwargs["widget"] = widgets.CKEditorUploadingWidget(
            config_name=config_name,
            extra_plugins=extra_plugins,
            external_plugin_resources=external_plugin_resources,
        )
        super().__init__(*args, **kwargs)
