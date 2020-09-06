from __future__ import absolute_import

from django import forms
from django.db import models

from .widgets import CKEditorWidget


class RichTextField(models.TextField):
    def __init__(self, *args, **kwargs):
        self.config_name = kwargs.pop("config_name", "default")
        self.extra_plugins = kwargs.pop("extra_plugins", [])
        self.external_plugin_resources = kwargs.pop("external_plugin_resources", [])
        super(RichTextField, self).__init__(*args, **kwargs)

    def formfield(self, **kwargs):
        defaults = {
            "form_class": self._get_form_class(),
            "config_name": self.config_name,
            "extra_plugins": self.extra_plugins,
            "external_plugin_resources": self.external_plugin_resources,
        }
        defaults.update(kwargs)
        return super(RichTextField, self).formfield(**defaults)

    @staticmethod
    def _get_form_class():
        return RichTextFormField


class RichTextFormField(forms.fields.CharField):
    def __init__(
        self,
        config_name="default",
        extra_plugins=None,
        external_plugin_resources=None,
        *args,
        **kwargs
    ):
        kwargs.update(
            {
                "widget": CKEditorWidget(
                    config_name=config_name,
                    extra_plugins=extra_plugins,
                    external_plugin_resources=external_plugin_resources,
                )
            }
        )
        super(RichTextFormField, self).__init__(*args, **kwargs)
