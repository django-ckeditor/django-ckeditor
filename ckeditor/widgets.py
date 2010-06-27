from django import forms
from django.conf import settings
from django.core.urlresolvers import reverse
from django.utils.safestring import mark_safe
from django.utils.html import conditional_escape
from django.utils.encoding import force_unicode
from django.utils import simplejson

from django.core.exceptions import ImproperlyConfigured
from django.forms.util import flatatt

json_encode = simplejson.JSONEncoder().encode

DEFAULT_CONFIG = {
    #'skin': 'v2',
    'toolbar': 'Full',
    'width': 618,
    'height': 291,
    'filebrowserWindowWidth': '940',
    'filebrowserWindowHeight': '747',
}

def deep_update(dictionary, *other_dicts):
    """
    Does a deep update of other_dicts' keys into dict.
    Any keys that also contain dictionaries will be deep_updated too.
    """
    for d in other_dicts:
        for k,v in d.iteritems():
            if k in dictionary and isinstance(dictionary[k], dict) \
                   and isinstance(v, dict):
                dictionary[k] = deep_update(dictionary[k], v)
            else:
                dictionary[k] = v
    return dictionary

class CKEditorWidget(forms.Textarea):
    """
    Widget providing CKEditor for Rich Text Editing.
    Supports direct image uploads and embed.
    """
    
    class Media:
        try:
            js = (
                settings.CKEDITOR_MEDIA_PREFIX + 'ckeditor/ckeditor.js',
            )
        except AttributeError:
            raise ImproperlyConfigured("django-ckeditor requires CKEDITOR_MEDIA_PREFIX setting.")

    
    def __init__(self, config_name='default', *args, **kwargs):
        super(CKEditorWidget, self).__init__(*args, **kwargs)
        self.config = DEFAULT_CONFIG.copy()
        try:
            deep_update(self.config, settings.CKEDITOR_CONFIG[config_name])
        except AttributeError:
            pass
    
    def render(self, name, value, attrs={}):
        if value is None: value = ''
        final_attrs = self.build_attrs(attrs, name=name)
        self.config['filebrowserUploadUrl'] = reverse('ckeditor_upload')
        self.config['filebrowserBrowseUrl'] = reverse('ckeditor_browse')
        return mark_safe(u'''<textarea%s>%s</textarea>
        <script type="text/javascript">
            CKEDITOR.replace("%s", %s);
        </script>''' % (flatatt(final_attrs), conditional_escape(force_unicode(value)), final_attrs['id'], json_encode(self.config)))
