from __future__ import absolute_import

from django import forms
from django.conf import settings
from django.core.exceptions import ImproperlyConfigured
from django.core.serializers.json import DjangoJSONEncoder
from django.template.loader import render_to_string
from django.utils.encoding import force_text
from django.utils.functional import Promise
from django.utils.html import conditional_escape
from django.utils.safestring import mark_safe
from django.utils.translation import get_language

from js_asset import JS, static

try:
    # Django >=1.7
    from django.forms.utils import flatatt
except ImportError:
    # Django <1.7
    from django.forms.util import flatatt


class LazyEncoder(DjangoJSONEncoder):

    def default(self, obj):
        if isinstance(obj, Promise):
            return force_text(obj)
        return super(LazyEncoder, self).default(obj)


json_encode = LazyEncoder().encode

DEFAULT_CONFIG = {
    'skin': 'moono-lisa',
    'toolbar_Basic': [
        ['Source', '-', 'Bold', 'Italic']
    ],
    'toolbar_Full': [
        ['Styles', 'Format', 'Bold', 'Italic', 'Underline', 'Strike', 'SpellChecker', 'Undo', 'Redo'],
        ['Link', 'Unlink', 'Anchor'],
        ['Image', 'Flash', 'Table', 'HorizontalRule'],
        ['TextColor', 'BGColor'],
        ['Smiley', 'SpecialChar'], ['Source'],
    ],
    'toolbar': 'Full',
    'height': 291,
    'width': 835,
    'filebrowserWindowWidth': 940,
    'filebrowserWindowHeight': 725,
}


class CKEditorWidget(forms.Textarea):
    """
    Widget providing CKEditor for Rich Text Editing.
    Supports direct image uploads and embed.
    """
    class Media:
        js = (
            JS('ckeditor/ckeditor-init.js', {
                'id': 'ckeditor-init-script',
                'data-ckeditor-basepath': getattr(
                    settings,
                    'CKEDITOR_BASEPATH',
                    static('ckeditor/ckeditor/'),
                ),
            }),
            'ckeditor/ckeditor/ckeditor.js',
        )

    def __init__(self, config_name='default', extra_plugins=None, external_plugin_resources=None, *args, **kwargs):
        super(CKEditorWidget, self).__init__(*args, **kwargs)
        # Setup config from defaults.
        self.config = DEFAULT_CONFIG.copy()

        # Try to get valid config from settings.
        configs = getattr(settings, 'CKEDITOR_CONFIGS', None)
        if configs:
            if isinstance(configs, dict):
                # Make sure the config_name exists.
                if config_name in configs:
                    config = configs[config_name]
                    # Make sure the configuration is a dictionary.
                    if not isinstance(config, dict):
                        raise ImproperlyConfigured('CKEDITOR_CONFIGS["%s"] \
                                setting must be a dictionary type.' %
                                                   config_name)
                    # Override defaults with settings config.
                    self.config.update(config)
                else:
                    raise ImproperlyConfigured("No configuration named '%s' \
                            found in your CKEDITOR_CONFIGS setting." %
                                               config_name)
            else:
                raise ImproperlyConfigured('CKEDITOR_CONFIGS setting must be a\
                        dictionary type.')

        extra_plugins = extra_plugins or []

        if extra_plugins:
            self.config['extraPlugins'] = ','.join(extra_plugins)

        self.external_plugin_resources = external_plugin_resources or []

    def render(self, name, value, attrs=None):
        if value is None:
            value = ''
        final_attrs = self.build_attrs(self.attrs, attrs, name=name)
        self._set_config()
        external_plugin_resources = [[force_text(a), force_text(b), force_text(c)]
                                     for a, b, c in self.external_plugin_resources]

        return mark_safe(render_to_string('ckeditor/widget.html', {
            'final_attrs': flatatt(final_attrs),
            'value': conditional_escape(force_text(value)),
            'id': final_attrs['id'],
            'config': json_encode(self.config),
            'external_plugin_resources': json_encode(external_plugin_resources)
        }))

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
        lang = get_language()
        if lang == 'zh-hans':
            lang = 'zh-cn'
        elif lang == 'zh-hant':
            lang = 'zh'
        self.config['language'] = lang
