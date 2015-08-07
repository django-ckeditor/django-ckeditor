from django import Forms

class SearchForm(forms.Form):
    q = forms.CharField(label='Search files')
