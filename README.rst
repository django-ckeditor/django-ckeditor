Django CKEditor:
================
**Django admin CKEditor integration.**

Provides a ``RichTextField`` and ``CKEditorWidget`` with the widget supporting image uploads.


Installation:
------------

#. Install or add django-ckeditor to your python path.

#. Add CKEDITOR_JS_URL to the project's ``settings.py`` file. This setting specifies the URL to the CKEditor Javascript include (ckeditor.js), i.e::
    
    CKEDITOR_JS_URL = "/media/ckeditor/ckeditor.js"

#. Add ckeditor include to the project's `` url.py`` file::
    
    (r'^ckeditor/', include('ckeditor.urls')),    

Usage:
------

Field:
~~~~~~
The quickest way to add rich text editing capabilities to your models is to use the included ``RichTextField`` model field type. A CKEditor widget is rendered as the form field but in all other regards the field behaves as the standard Django ``TextField``. For example::

    from django.db import models
    from ckeditor.fields import RichTextField

    class Post(models.Model):
        content = RichTextField()


Widget:
~~~~~~~
Alernatively you can use the included ``CKEditorWidget`` as the widget for a formfield. For example::

    from django import forms
    from django.contrib import admin
    from ckeditor.widgets import CKEditorWidget

    from post.models import Post

    class PostAdminForm(forms.ModelForm):
        content = forms.CharField(widget=CKEditorWidget())
        class Meta:
            model = Post

    class PostAdmin(admin.ModelAdmin):
        form = PostAdminForm
    
    admin.site.register(Post, PostAdmin)


TODO:
-----
#. Add filebrowser support.
