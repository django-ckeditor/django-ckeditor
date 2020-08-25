from __future__ import absolute_import

from django import forms
try:
    from django.utils.translation import gettext_lazy as _
except ImportError:
    from django.utils.translation import ugettext_lazy as _


class SearchForm(forms.Form):
    q = forms.CharField(label=_('Search files'), required=False)
