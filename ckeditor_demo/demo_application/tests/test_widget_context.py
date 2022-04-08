from http import HTTPStatus

from django.forms.utils import flatatt
from django.test import TestCase
from django.urls import reverse

from ckeditor.widgets import json_encode
from .utils import get_config, get_contexts_for_widgets
from ..forms import CkEditorMultiWidgetForm


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

    @classmethod
    def get_expected_widget_context(cls, field_name, widget_id, expected_config):
        widget_dict = cls.get_expected_widget_dict_for_widget_context(
            field_name, widget_id
        )
        final_attrs = {
            **widget_dict["attrs"],
            "name": field_name,
        }
        return {
            "widget": widget_dict,
            "config": json_encode(expected_config),
            "external_plugin_resources": "[]",
            "final_attrs": flatatt(final_attrs),
            "value": "",
            "id": widget_id,
        }

    @staticmethod
    def get_expected_widget_dict_for_widget_context(field_name, widget_id):
        return {
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
        }

    def test_rendered_ckeditor_multi_widgets_contain_expected_context(self):
        response = self.client.get(reverse("ckeditor-multi-widget-form"))
        self.assertEqual(response.status_code, HTTPStatus.OK)

        widget_contexts = get_contexts_for_widgets(response)

        field_names = (
            "ckeditor_standard_multi_widget_example",
            "ckeditor_upload_multi_widget_example",
        )
        self.assertEqual(len(widget_contexts), len(field_names))

        for field_name in field_names:
            with self.subTest(field_name=field_name):
                widget_id = f"id_{field_name}"
                self.assertIn(widget_id, widget_contexts)
                widget_context = widget_contexts[widget_id]

                expected_widget_context = self.get_expected_multi_widget_context(
                    field_name, widget_id
                )
                self.assertDictEqual(widget_context, expected_widget_context)

    @classmethod
    def get_expected_multi_widget_context(cls, field_name, widget_id):
        subwidgets = []
        for subwidget_suffix in CkEditorMultiWidgetForm.SUBWIDGET_SUFFIXES:
            subwidget = cls.get_expected_widget_dict_for_widget_context(
                f"{field_name}_{subwidget_suffix}",
                f"{widget_id}_{subwidget_suffix}",
            )
            # Each subwidget is non-required (even if its `required` attr is True)
            subwidget["required"] = False
            subwidgets.append(subwidget)
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
                "subwidgets": subwidgets,
            },
        }
