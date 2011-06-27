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
    DEFAULT_CONFIG = {
        'skin': 'v2',
        'toolbar': 'Full',
        'height': 291,
        'width': 618,
        'filebrowserWindowWidth': 940,
        'filebrowserWindowHeight': 747,
        # later on we initialize 'filebrowserUploadUrl' and 'filebrowserBrowseUrl' which are dynamic
    }

    
    class Media:
        try:
            js = (
                settings.CKEDITOR_MEDIA_PREFIX + 'ckeditor/ckeditor.js',
            )
        except AttributeError:
            raise ImproperlyConfigured("django-ckeditor requires CKEDITOR_MEDIA_PREFIX setting. This setting specifies a URL prefix to the ckeditor JS and CSS media (not uploaded media). Make sure to use a trailing slash: CKEDITOR_MEDIA_PREFIX = '/media/ckeditor/'")

    def __init__(self, config_name='default', *args, **kwargs):
        super(CKEditorWidget, self).__init__(*args, **kwargs)
        self.config = self.DEFAULT_CONFIG.copy() # create instance specific setting

        # Try to get valid config from settings.
        configs = getattr(settings, 'CKEDITOR_CONFIGS', None)
        if configs != None: 
            if isinstance(configs, dict):
                # Make sure the config_name exists.
                if configs.has_key(config_name):
                    config = configs[config_name]
                    # Make sure the configuration is a dictionary.
                    if not isinstance(config, dict):
                        raise ImproperlyConfigured('CKEDITOR_CONFIGS["%s"] setting must be a dictionary type.' % config_name)
                    # Override defaults with settings config.
                    self.config.update(config)
                else:
                    raise ImproperlyConfigured("No configuration named '%s' found in your CKEDITOR_CONFIGS setting." % config_name)
            else:
                raise ImproperlyConfigured('CKEDITOR_CONFIGS setting must be a dictionary type.')
            
    def render(self, name, value, attrs={}):
        # Finish setting up DEFAULT_CONFIG - we do it here as in __init__ urls are not defined yet 
        # also we can't use lambda to try to put it in __init__ as json_encode dosen't know how to handle it
        try: 
            self.config['filebrowserUploadUrl']
        except KeyError:
            self.config['filebrowserUploadUrl'] = reverse('ckeditor_upload') # shared among class
            self.config['filebrowserBrowseUrl'] = reverse('ckeditor_browse') # shared among class
        
        
        
        if value is None: value = ''
        final_attrs = self.build_attrs(attrs, name=name)
        return mark_safe(u'''<textarea%s>%s</textarea>
        <script type="text/javascript">
            CKEDITOR.replace("%s", %s);
        </script>''' % (flatatt(final_attrs), conditional_escape(force_unicode(value)), final_attrs['id'], json_encode(self.config)))
