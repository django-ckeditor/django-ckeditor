from django.core.urlresolvers import reverse
from django.views import generic

from ckeditor_demo.demo_application import forms


class CkEditorFormView(generic.FormView):
    form_class = forms.CkEditorForm
    template_name = 'form.html'

    def get_success_url(self):
        return reverse('ckeditor-form')

ckeditor_form_view = CkEditorFormView.as_view()
