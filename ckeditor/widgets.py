from django import forms
from django.conf import settings
from django.core.exceptions import ImproperlyConfigured
from django.core.serializers.json import DjangoJSONEncoder
from django.forms.renderers import get_default_renderer
from django.forms.utils import flatatt
from django.templatetags.static import static
from django.utils.encoding import force_str
from django.utils.functional import Promise
from django.utils.html import conditional_escape
from django.utils.safestring import mark_safe
from django.utils.translation import get_language
from js_asset import JS

from .configs import DEFAULT_CONFIG


class LazyEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, Promise):
            return force_str(obj)
        return super().default(obj)


json_encode = LazyEncoder().encode


class CKEditorWidget(forms.Textarea):
    """
    Widget providing CKEditor for Rich Text Editing.
    Supports direct image uploads and embed.
    """

    class Media:
        js = (
            JS(
                "ckeditor/ckeditor-init.js",
                {
                    "id": "ckeditor-init-script",
                    "data-ckeditor-basepath": getattr(
                        settings,
                        "CKEDITOR_BASEPATH",
                        static("ckeditor/ckeditor/"),
                    ),
                },
            ),
            "ckeditor/ckeditor/ckeditor.js",
        )

    def __init__(
        self,
        config_name="default",
        extra_plugins=None,
        external_plugin_resources=None,
        *args,
        **kwargs
    ):
        super().__init__(*args, **kwargs)
        # Setup config from defaults.
        self.config = DEFAULT_CONFIG.copy()

        # Try to get valid config from settings.
        configs = getattr(settings, "CKEDITOR_CONFIGS", None)
        if configs:
            if isinstance(configs, dict):
                # Make sure the config_name exists.
                if config_name in configs:
                    config = configs[config_name]
                    # Make sure the configuration is a dictionary.
                    if not isinstance(config, dict):
                        raise ImproperlyConfigured(
                            'CKEDITOR_CONFIGS["%s"] \
                                setting must be a dictionary type.'
                            % config_name
                        )
                    # Override defaults with settings config.
                    self.config.update(config)
                else:
                    raise ImproperlyConfigured(
                        "No configuration named '%s' \
                            found in your CKEDITOR_CONFIGS setting."
                        % config_name
                    )
            else:
                raise ImproperlyConfigured(
                    "CKEDITOR_CONFIGS setting must be a\
                        dictionary type."
                )

        extra_plugins = extra_plugins or self.config.pop("extra_plugins", None) or []

        if extra_plugins:
            self.config["extraPlugins"] = ",".join(extra_plugins)

        self.external_plugin_resources = (
            external_plugin_resources
            or self.config.pop("external_plugin_resources", None)
            or []
        )

    def render(self, name, value, attrs=None, renderer=None):
        if renderer is None:
            renderer = get_default_renderer()
        if value is None:
            value = ""
        final_attrs = self.build_attrs(self.attrs, attrs, name=name)
        self._set_config()
        external_plugin_resources = [
            [force_str(a), force_str(b), force_str(c)]
            for a, b, c in self.external_plugin_resources
        ]

        return mark_safe(
            renderer.render(
                "ckeditor/widget.html",
                {
                    "final_attrs": flatatt(final_attrs),
                    "value": conditional_escape(force_str(value)),
                    "id": final_attrs["id"],
                    "config": json_encode(self.config),
                    "external_plugin_resources": json_encode(external_plugin_resources),
                },
            )
        )

    def build_attrs(self, base_attrs, extra_attrs=None, **kwargs):
        """
        Helper function for building an attribute dictionary.
        This is combination of the same method from Django<=1.10 and Django1.11+
        """
        attrs = dict(base_attrs, **kwargs)
        if extra_attrs:
            attrs.update(extra_attrs)
        return attrs

    def _set_config(self):
        lang = get_language().lower()
        if lang == "zh-hans":
            lang = "zh-cn"
        elif lang == "zh-hant":
            lang = "zh"
        self.config["language"] = lang
