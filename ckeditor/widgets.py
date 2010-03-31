from django import forms
from django.conf import settings
from django.utils.safestring import mark_safe
from django.utils.html import conditional_escape
from django.utils.encoding import force_unicode

from django.forms.util import flatatt

class CKEditorWidget(forms.Textarea):
    class Media:
        js = (
            settings.CKEDITOR_JS_URL,
        )
    
    def render(self, name, value, attrs={}):
        if value is None: value = ''
        final_attrs = self.build_attrs(attrs, name=name)
        return mark_safe(u'''<textarea%s>%s</textarea>
        <script type="text/javascript">
            CKEDITOR.replace("%s",
                {
                    skin: "v2",
                    toolbar : "Full",
                    height:"291", 
                    width:"618",
                    filebrowserUploadUrl : '/ckeditor/upload/',
                }
            );
        </script>''' % (flatatt(final_attrs), conditional_escape(force_unicode(value)), final_attrs['id']))
