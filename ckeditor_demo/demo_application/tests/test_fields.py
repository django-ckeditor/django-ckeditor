from http import HTTPStatus

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

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
        self.assert_form_contains_expected_formfield_with_default_widget_options(
            form, "content", RichTextFormField, CKEditorWidget
        )

    def test_upload_model_form_contains_expected_formfield(self):
        form = ExampleModelForm()
        self.assert_form_contains_expected_formfield_with_default_widget_options(
            form, "content", RichTextUploadingFormField, CKEditorUploadingWidget
        )

    def assert_form_contains_expected_formfield_with_default_widget_options(
        self, form, field_name, expected_field_type, expected_widget_type
    ):
        form_field = form.fields[field_name]
        self.assertIs(type(form_field), expected_field_type)
        widget = form_field.widget
        self.assertIs(type(widget), expected_widget_type)
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

    def test_admin_model_forms_contain_expected_formfields(self):
        superuser = get_user_model().objects.create_user(
            username="superuser", is_superuser=True, is_staff=True
        )
        self.client.force_login(superuser)

        response = self.client.get(
            reverse("admin:demo_application_examplenonuploadmodel_add")
        )
        self.assertEqual(response.status_code, HTTPStatus.OK)

        form = response.context["adminform"].form
        self.assert_form_contains_expected_formfield_with_default_widget_options(
            form, "content", RichTextFormField, CKEditorWidget
        )

        response = self.client.get(reverse("admin:demo_application_examplemodel_add"))
        self.assertEqual(response.status_code, HTTPStatus.OK)

        form = response.context["adminform"].form
        self.assert_form_contains_expected_formfield_with_default_widget_options(
            form, "content", RichTextUploadingFormField, CKEditorUploadingWidget
        )
