Django CKEditor
================
**Django admin CKEditor integration.**

Provides a ``RichTextField`` and ``CKEditorWidget`` utilizing CKEditor with image upload and browsing support included.


Installation
------------

#. Install or add django-ckeditor to your python path.

#. Add ``ckeditor`` to your INSTALLED_APPS setting.

#. Copy the ``media/ckeditor`` directory into any directory within your media root. You can override the location in your settings (see below).

#. Add a CKEDITOR_MEDIA_PREFIX setting to the project's ``settings.py`` file. This setting specifies a URL prefix to the ckeditor JS and CSS media (not uploaded media). Make sure to use a trailing slash::

    CKEDITOR_MEDIA_PREFIX = "/media/ckeditor/"

#. Add a CKEDITOR_UPLOAD_PATH setting to the project's ``settings.py`` file. This setting specifies an absolute path to your ckeditor media upload directory. Make sure you have write permissions for the path, i.e.::

    CKEDITOR_UPLOAD_PATH = "/home/media/media.lawrence.com/uploads"

#. Add ckeditor url include to the project's ``url.py`` file::
    
    (r'^ckeditor/', include('ckeditor.urls')),    

#. Optionally, add a CKEDITOR_UPLOAD_PREFIX setting to the project's ``settings.py`` file. This setting specifies a URL prefix to media uploaded through ckeditor, i.e.::

    CKEDITOR_UPLOAD_PREFIX = "http://media.lawrence.com/media/ckuploads/

(If CKEDITOR_UPLOAD_PREFIX is not provided, the media URL will fall back to MEDIA_URL with the difference of MEDIA_ROOT and CKEDITOR_UPLOAD_PATH appended.)

Usage
-----

Field
~~~~~
The quickest way to add rich text editing capabilities to your models is to use the included ``RichTextField`` model field type. A CKEditor widget is rendered as the form field but in all other regards the field behaves as the standard Django ``TextField``. For example::

    from django.db import models
    from ckeditor.fields import RichTextField

    class Post(models.Model):
        content = RichTextField()


Widget
~~~~~~
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


ChangeLog
~~~~~~~~~

0.0.1
+++++

#. Added CKEDITOR_UPLOAD_PREFIX setting. Thanks to chr15m for the input.

0.0.2
+++++

#. Included README.rst in manifest.
