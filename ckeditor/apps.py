from django.apps import AppConfig
from django.core.checks import Warning, register


def check_ckeditor_version(app_configs, **kwargs):
    return [
        Warning(
            "django-ckeditor bundles CKEditor 4.22.1 which isn't supported anymore and which does have unfixed security issues, see for example https://ckeditor.com/cke4/release/CKEditor-4.24.0-LTS . You should consider strongly switching to a different editor (maybe CKEditor 5 respectively django-ckeditor-5 after checking whether the CKEditor 5 license terms work for you) or switch to the non-free CKEditor 4 LTS package. See https://ckeditor.com/ckeditor-4-support/ for more on this. (Note! This notice has been added by the django-ckeditor developers and we are not affiliated with CKSource and were not involved in the licensing change, so please refrain from complaining to us. Thanks.)",
            id="ckeditor.W001",
        )
    ]


class CKEditorConfig(AppConfig):
    default_auto_field = "django.db.models.AutoField"
    name = "ckeditor"

    def ready(self):
        register(check_ckeditor_version)
