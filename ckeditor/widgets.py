from django import forms
from django.conf import settings
from django.core.urlresolvers import reverse
from django.template.loader import render_to_string
from django.utils.safestring import mark_safe
from django.utils.html import conditional_escape
from django.utils.encoding import force_unicode
from django.utils import simplejson

from django.core.exceptions import ImproperlyConfigured
from django.forms.util import flatatt
from django.contrib.staticfiles import finders

json_encode = simplejson.JSONEncoder().encode

DEFAULT_CONFIG = {
    'skin': 'v2',
    'toolbar': 'Full',
    'height': 291,
    'width': 618,
    'filebrowserWindowWidth': 940,
    'filebrowserWindowHeight': 747,
}


class CKEditorWidget(forms.Textarea):
    """
    Widget providing CKEditor for Rich Text Editing.
    Supports direct image uploads and embed.
    """
    class Media:
        js = (
            settings.STATIC_URL + 'ckeditor/ckeditor.js',
        )

    def __init__(self, config_name='default', *args, **kwargs):
        super(CKEditorWidget, self).__init__(*args, **kwargs)
        # Setup config from defaults.
        self.config = DEFAULT_CONFIG

        # Try to get valid config from settings.
        configs = getattr(settings, 'CKEDITOR_CONFIGS', None)
        if configs != None:
            if isinstance(configs, dict):
                # Make sure the config_name exists.
                if configs.has_key(config_name):
                    config = configs[config_name]
                    # Make sure the configuration is a dictionary.
                    if not isinstance(config, dict):
                        raise ImproperlyConfigured('CKEDITOR_CONFIGS["%s"] \
                                setting must be a dictionary type.' % \
                                config_name)
                    # Override defaults with settings config.
                    self.config.update(config)
                else:
                    raise ImproperlyConfigured("No configuration named '%s' \
                            found in your CKEDITOR_CONFIGS setting." % \
                            config_name)
            else:
                raise ImproperlyConfigured('CKEDITOR_CONFIGS setting must be a\
                        dictionary type.')

    def render(self, name, value, attrs={}):
        if value is None:
            value = ''
        final_attrs = self.build_attrs(attrs, name=name)
        self.config['filebrowserUploadUrl'] = reverse('ckeditor_upload')
        self.config['filebrowserBrowseUrl'] = reverse('ckeditor_browse')
        return mark_safe(render_to_string('ckeditor/widget.html', {
            'final_attrs': flatatt(final_attrs),
            'value': conditional_escape(force_unicode(value)),
            'id': final_attrs['id'],
            'config': json_encode(self.config)
            })
        )
