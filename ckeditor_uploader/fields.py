from django import forms

from ckeditor import fields
from ckeditor_uploader import widgets


class RichTextUploadingField(fields.RichTextField):
    @staticmethod
    def _get_form_class():
        return RichTextUploadingFormField


class RichTextUploadingFormField(forms.fields.CharField):
    def __init__(self, config_name='default', extra_plugins=None, external_plugin_resources=None, *args, **kwargs):
        kwargs.update({'widget': widgets.CKEditorUploadingWidget(config_name=config_name, extra_plugins=extra_plugins,
                                                                 external_plugin_resources=external_plugin_resources)})
        super(RichTextUploadingFormField, self).__init__(*args, **kwargs)


try:
    from south.modelsinspector import add_introspection_rules
    add_introspection_rules([], ["^ckeditor_uploader\.fields\.RichTextUploadingField"])
except ImportError:
    pass
