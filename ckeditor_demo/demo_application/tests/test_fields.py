from django.test import TestCase

from ckeditor.fields import RichTextFormField
from ckeditor.widgets import CKEditorWidget
from ckeditor_uploader.fields import RichTextUploadingFormField
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from ..forms import (
    ExampleModelForm,
    ExampleModelOverriddenWidgetForm,
    ExampleNonUploadModelForm,
)


class ModelFieldAndFormFieldTestCase(TestCase):
    def test_non_upload_model_form_contains_expected_formfield(self):
        form = ExampleNonUploadModelForm()
        form_field = form.fields["content"]
        self.assertIs(type(form_field), RichTextFormField)
        widget = form_field.widget
        self.assertIs(type(widget), CKEditorWidget)
        self.assertEqual(widget.config_name, "default")
        self.assertEqual(widget.config.get("extraPlugins"), None)
        self.assertListEqual(widget.external_plugin_resources, [])

    def test_upload_model_form_contains_expected_formfield(self):
        form = ExampleModelForm()
        form_field = form.fields["content"]
        self.assertIs(type(form_field), RichTextUploadingFormField)
        widget = form_field.widget
        self.assertIs(type(widget), CKEditorUploadingWidget)
        self.assertEqual(widget.config_name, "default")
        self.assertEqual(widget.config.get("extraPlugins"), None)
        self.assertListEqual(widget.external_plugin_resources, [])

    def test_upload_model_form_with_overridden_widget_contains_expected_formfield(self):
        form = ExampleModelOverriddenWidgetForm()
        form_field = form.fields["content"]
        self.assertIs(type(form_field), RichTextUploadingFormField)
        widget = form_field.widget
        self.assertIs(type(widget), CKEditorUploadingWidget)
        self.assertEqual(widget.config_name, "my-custom-toolbar")
        self.assertEqual(widget.config.get("extraPlugins"), "someplugin,anotherplugin")
        self.assertListEqual(
            widget.external_plugin_resources,
            [
                (
                    "someplugin",
                    "/static/path/to/someplugin/",
                    "plugin.js",
                )
            ],
        )
