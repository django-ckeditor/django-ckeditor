from django import forms
from django.db import models

from .widgets import CKEditorWidget


class RichTextField(models.TextField):
    def __init__(self, *args, **kwargs):
        self.config_name = kwargs.pop("config_name", "default")
        self.extra_plugins = kwargs.pop("extra_plugins", [])
        self.external_plugin_resources = kwargs.pop("external_plugin_resources", [])
        super().__init__(*args, **kwargs)

    def formfield(self, **kwargs):
        defaults = {
            "form_class": RichTextFormField,
            "config_name": self.config_name,
            "extra_plugins": self.extra_plugins,
            "external_plugin_resources": self.external_plugin_resources,
            "widget": RichTextFormField.widget(
                config_name=self.config_name,
                extra_plugins=self.extra_plugins,
                external_plugin_resources=self.external_plugin_resources,
            ),
        }
        defaults.update(kwargs)
        return super().formfield(**defaults)


class RichTextFormField(forms.fields.CharField):
    widget = CKEditorWidget

    def __init__(
        self,
        config_name="default",
        extra_plugins=None,
        external_plugin_resources=None,
        *args,
        **kwargs
    ):
        defaults = {
            "widget": self.widget(
                config_name=config_name,
                extra_plugins=extra_plugins,
                external_plugin_resources=external_plugin_resources,
            ),
        }
        defaults.update(kwargs)
        super().__init__(*args, **defaults)
