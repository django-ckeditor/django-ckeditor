from __future__ import absolute_import

from django import forms


class SearchForm(forms.Form):
    q = forms.CharField(label='Search files', required=False)
