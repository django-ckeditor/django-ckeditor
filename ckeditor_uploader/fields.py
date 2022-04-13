from django.contrib.admin.options import FORMFIELD_FOR_DBFIELD_DEFAULTS

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


# Makes sure that the `formfield()` method above doesn't receive the default `widget`
# argument from the Django admin site, which would have overwritten our own widget with
# an `AdminTextareaWidget`
# (This is not strictly necessary when a default for `RichTextField` is already added
# in `ckeditor/fields.py`, but better to have here as well, in case something changes)
FORMFIELD_FOR_DBFIELD_DEFAULTS[RichTextUploadingField] = {}


class RichTextUploadingFormField(fields.RichTextFormField):
    widget = widgets.CKEditorUploadingWidget
