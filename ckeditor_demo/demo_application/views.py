from __future__ import absolute_import

from django.views import generic

from . import forms

try:
    from django.urls import reverse
except ImportError:  # Django < 2.0
    from django.core.urlresolvers import reverse


class CkEditorFormView(generic.FormView):
    form_class = forms.CkEditorForm
    template_name = 'form.html'

    def get_success_url(self):
        return reverse('ckeditor-form')


ckeditor_form_view = CkEditorFormView.as_view()
