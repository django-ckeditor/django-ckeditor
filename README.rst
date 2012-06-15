Django CKEditor
================
**Django admin CKEditor integration.**

Provides a ``RichTextField`` and ``CKEditorWidget`` utilizing CKEditor with image upload and browsing support included.

.. contents:: Contents
    :depth: 5

Installation
------------

#. Install or add django-ckeditor to your python path.

#. Add ``ckeditor`` to your INSTALLED_APPS setting.

#. Copy the ``media/ckeditor`` directory into any directory within your media root. You can override the location in your settings (see below).

#. Add a CKEDITOR_UPLOAD_PATH setting to the project's ``settings.py`` file. This setting specifies an absolute path to your ckeditor media upload directory. Make sure you have write permissions for the path, i.e.::

    CKEDITOR_UPLOAD_PATH = "/home/media/media.lawrence.com/uploads"

#. Add ckeditor url include to the project's ``urls.py`` file::
    
    (r'^ckeditor/', include('ckeditor.urls')),    

#. Optionally, set the CKEDITOR_RESTRICT_BY_USER setting to ``True`` in the project's ``settings.py`` file (default ``False``). This restricts access to uploaded images to the uploading user (e.g. each user only sees and uploads their own images). Superusers can still see all images. **NOTE**: This restriction is only enforced within the CKEditor media browser. 

#. Optionally, add a CKEDITOR_UPLOAD_PREFIX setting to the project's ``settings.py`` file. This setting specifies a URL prefix to media uploaded through ckeditor, i.e.::

       CKEDITOR_UPLOAD_PREFIX = "http://media.lawrence.com/media/ckuploads/
       
   (If CKEDITOR_UPLOAD_PREFIX is not provided, the media URL will fall back to MEDIA_URL with the difference of MEDIA_ROOT and the uploaded resource's full path and filename appended.)

#. Optionally, add CKEDITOR_CONFIGS setting to the project's ``settings.py`` file. This specifies sets of CKEditor settings that are passed to CKEditor (see CKEditor's `Setting Configurations <http://docs.cksource.com/CKEditor_3.x/Developers_Guide/Setting_Configurations>`_), i.e.::

       CKEDITOR_CONFIGS = {
           'awesome_ckeditor': {
               'toolbar': 'Basic',
           },
       }
   
   The name of the settings can be referenced when instantiating a RichTextField::

       content = RichTextField(config_name='awesome_ckeditor')

   The name of the settings can be referenced when instantiating a CKEditorWidget::

       widget = CKEditorWidget(config_name='awesome_ckeditor')
   
   By specifying a set named ``default`` you'll be applying its settings to all RichTextField and CKEditorWidget objects for which ``config_name`` has not been explicitly defined ::
       
       CKEDITOR_CONFIGS = {
           'default': {
               'toolbar': 'Full',
               'height': 300,
               'width': 300,
           },
       }

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

**NOTE**: If you're using custom views remember to include ckeditor.js in your form's media either through ``{{ form.media }}`` or through a ``<script>`` tag. Admin will do this for you automatically. See `Django's Form Media docs <http://docs.djangoproject.com/en/dev/topics/forms/media/>`_ for more info.
