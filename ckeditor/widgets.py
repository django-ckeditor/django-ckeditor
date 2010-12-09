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
            raise ImproperlyConfigured("django-ckeditor requires CKEDITOR_MEDIA_PREFIX setting. This setting specifies a URL prefix to the ckeditor JS and CSS media (not uploaded media). Make sure to use a trailing slash: CKEDITOR_MEDIA_PREFIX = '/media/ckeditor/'")

    def __init__(self, config_name='default', *args, **kwargs):
        super(CKEditorWidget, self).__init__(*args, **kwargs)
        try:
            self.config = settings.CKEDITOR_CONFIGS[config_name]
            if not isinstance(self.config, dict):
                raise ImproperlyConfigured('CKEDITOR_CONFIGS["%s"] setting must be a dictionary type.' % config_name)
        except AttributeError:
            self.config = {
                'skin': 'v2',
                'toolbar': 'Full',
                'height': 291,
                'width': 618,
                'filebrowserWindowWidth': 940,
                'filebrowserWindowHeight': 747,
            }
        self.config['filebrowserUploadUrl'] = reverse('ckeditor_upload')
        self.config['filebrowserBrowseUrl'] = reverse('ckeditor_browse')
    
    def render(self, name, value, attrs={}):
        if value is None: value = ''
        final_attrs = self.build_attrs(attrs, name=name)
        return mark_safe(u'''<textarea%s>%s</textarea>
        <script type="text/javascript">
            CKEDITOR.replace("%s", %s);
        </script>''' % (flatatt(final_attrs), conditional_escape(force_unicode(value)), final_attrs['id'], json_encode(self.config)))
