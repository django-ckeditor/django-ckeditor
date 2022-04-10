from ckeditor import fields
from . import widgets


class RichTextUploadingField(fields.RichTextField):
    def formfield(self, **kwargs):
        defaults = {
            "form_class": RichTextUploadingFormField,
            "widget": RichTextUploadingFormField.widget(
                config_name=self.config_name,
                extra_plugins=self.extra_plugins,
                external_plugin_resources=self.external_plugin_resources,
            ),
        }
        defaults.update(kwargs)
        return super().formfield(**defaults)


class RichTextUploadingFormField(fields.RichTextFormField):
    widget = widgets.CKEditorUploadingWidget
