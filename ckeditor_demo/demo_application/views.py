from django.urls import reverse
from django.views import generic

from . import forms


class CkEditorFormView(generic.FormView):
    form_class = forms.CkEditorForm
    template_name = "form.html"

    def get_success_url(self):
        return reverse("ckeditor-form")


class CkEditorMultiWidgetFormView(generic.FormView):
    form_class = forms.CkEditorMultiWidgetForm
    template_name = "form.html"

    def get_success_url(self):
        return reverse("ckeditor-multi-widget-form")


ckeditor_form_view = CkEditorFormView.as_view()
ckeditor_multi_widget_form_view = CkEditorMultiWidgetFormView.as_view()
