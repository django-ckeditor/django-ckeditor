from django.apps import AppConfig
from django.core.checks import Warning, register
import ckeditor


def check_ckeditor_version(app_configs, **kwargs):
    if ckeditor.__version__ == "4.22.1":
        return [
            Warning(
                (
                    "django-ckeditor bundles CKEditor 4.22.1, which is no longer supported "
                    "and has unresolved security issues. See https://ckeditor.com/cke4/release/CKEditor-4.24.0-LTS. "
                    "Consider switching to CKEditor 5 (via django-ckeditor-5) if the license terms fit your use, "
                    "or to CKEditor 4 LTS (non-free) for ongoing support. For more information, visit "
                    "https://ckeditor.com/ckeditor-4-support/. Note: This message is provided by the django-ckeditor "
                    "maintainers, who are unaffiliated with CKSource. Please direct any license-related questions to them. "
                ),
                id="ckeditor.W001",
            )
        ]
    return []  # No warnings if version is not 4.22.1


class CKEditorConfig(AppConfig):
    default_auto_field = "django.db.models.AutoField"
    name = "ckeditor"

    def ready(self):
        register(check_ckeditor_version)
