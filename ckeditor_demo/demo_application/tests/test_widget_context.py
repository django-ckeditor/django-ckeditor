from http import HTTPStatus

from django.test import TestCase
from django.urls import reverse

from ckeditor.widgets import json_encode

from ..forms import CkEditorMultiWidgetForm
from .utils import get_config, get_contexts_for_widgets


class WidgetContextTestCase(TestCase):
    def setUp(self):
        # Facilitates printing the whole diff if the tests fail
        self.maxDiff = None

    def test_rendered_ckeditor_widgets_contain_expected_context(self):
        response = self.client.get(reverse("ckeditor-form"))
        self.assertEqual(response.status_code, HTTPStatus.OK)

        widget_contexts = get_contexts_for_widgets(response)

        field_name__config__tuples = (
            (
                "ckeditor_standard_example",
                {
                    **get_config("default"),
                    "language": "en-us",
                },
            ),
            (
                "ckeditor_upload_example",
                {
                    **get_config("my-custom-toolbar"),
                    "filebrowserUploadUrl": reverse("ckeditor_upload"),
                    "filebrowserBrowseUrl": reverse("ckeditor_browse"),
                    "language": "en-us",
                },
            ),
        )
        self.assertEqual(len(widget_contexts), len(field_name__config__tuples))

        for field_name, expected_config in field_name__config__tuples:
            with self.subTest(field_name=field_name):
                widget_id = f"id_{field_name}"
                self.assertIn(widget_id, widget_contexts)
                widget_context = widget_contexts[widget_id]

                expected_widget_context = self.get_expected_widget_context(
                    field_name,
                    widget_id,
                    expected_config,
                )
                self.assertDictEqual(widget_context, expected_widget_context)

    @staticmethod
    def get_expected_widget_context(field_name, widget_id, expected_config: dict):
        return {
            "widget": {
                "name": field_name,
                "is_hidden": False,
                "required": True,
                "value": None,
                "attrs": {
                    "cols": "40",
                    "rows": "10",
                    "required": True,
                    "id": widget_id,
                },
                "template_name": "ckeditor/widget.html",
                "config": json_encode(expected_config),
                "external_plugin_resources": "[]",
            },
        }

    def test_rendered_ckeditor_multi_widgets_contain_expected_context(self):
        response = self.client.get(reverse("ckeditor-multi-widget-form"))
        self.assertEqual(response.status_code, HTTPStatus.OK)

        widget_contexts = get_contexts_for_widgets(response)

        field_name__config__tuples = (
            (
                "ckeditor_standard_multi_widget_example",
                {
                    **get_config("default"),
                    "language": "en-us",
                },
            ),
            (
                "ckeditor_upload_multi_widget_example",
                {
                    **get_config("my-custom-toolbar"),
                    "filebrowserUploadUrl": reverse("ckeditor_upload"),
                    "filebrowserBrowseUrl": reverse("ckeditor_browse"),
                    "language": "en-us",
                },
            ),
        )
        self.assertEqual(len(widget_contexts), len(field_name__config__tuples))

        for field_name, expected_config in field_name__config__tuples:
            with self.subTest(field_name=field_name):
                widget_id = f"id_{field_name}"
                self.assertIn(widget_id, widget_contexts)
                widget_context = widget_contexts[widget_id]

                expected_widget_context = self.get_expected_multi_widget_context(
                    field_name, widget_id, expected_config
                )
                self.assertDictEqual(widget_context, expected_widget_context)

    @classmethod
    def get_expected_multi_widget_context(
        cls, field_name, widget_id, expected_config: dict
    ):
        subwidget_contexts = []
        for subwidget_suffix in CkEditorMultiWidgetForm.SUBWIDGET_SUFFIXES:
            expected_widget_context = cls.get_expected_widget_context(
                f"{field_name}_{subwidget_suffix}",
                f"{widget_id}_{subwidget_suffix}",
                expected_config,
            )
            # The multi-widget only uses the contents of the `widget` context variable
            subwidget_context = expected_widget_context["widget"]
            # Each subwidget is non-required (even if its `required` attr is True)
            subwidget_context["required"] = False
            subwidget_contexts.append(subwidget_context)
        return {
            "widget": {
                "name": field_name,
                "is_hidden": False,
                "required": True,
                "value": None,
                "attrs": {
                    "required": True,
                    "id": widget_id,
                },
                "template_name": "django/forms/widgets/multiwidget.html",
                "subwidgets": subwidget_contexts,
            },
        }
