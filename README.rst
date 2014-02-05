Django CKEditor
================
**Django admin CKEditor integration.**

Provides a ``RichTextField`` and ``CKEditorWidget`` utilizing CKEditor with image upload and browsing support included.

* This version also includes:
#. support to django-storages (works with S3)
#. updated ckeditor to version 4.2.1
#. included all ckeditor language files to made everyone happy!

.. contents:: Contents
    :depth: 5

Installation
------------

Required
~~~~~~~~
#. Install or add django-ckeditor to your python path.

#. Add ``ckeditor`` to your ``INSTALLED_APPS`` setting.

#. Run the ``collectstatic`` management command: ``$ /manage.py collectstatic``. This'll copy static CKEditor require media resources into the directory given by the ``STATIC_ROOT`` setting. See `Django's documentation on managing static files <https://docs.djangoproject.com/en/dev/howto/static-files>`_ for more info.

#. Add a CKEDITOR_UPLOAD_PATH setting to the project's ``settings.py`` file. This setting specifies an relative path to your CKEditor media upload directory. CKEditor uses Django storage API. By default Django uses file system storage backend (it will use your MEDIA_ROOT and MEDIA_URL) and if you don't use different backend you have to have write permissions for the CKEDITOR_UPLOAD_PATH path within MEDIA_ROOT, i.e.::

    CKEDITOR_UPLOAD_PATH = "uploads/"

   For the default file system storage images will be uploaded to "uploads" folder in your MEDIA_ROOT and urls will be created against MEDIA_URL (/media/uploads/image.jpg).

   CKEditor has been tested with django FileSystemStorage and S3BotoStorage.
   There are issues using S3Storage from django-storages.

#. Run the ``collectstatic`` management command: ``$ /manage.py collectstatic``. This'll copy static CKEditor require media resources into the directory given by the ``STATIC_ROOT`` setting. See `Django's documentation on managing static files <https://docs.djangoproject.com/en/dev/howto/static-files>`_ for more info.

#. Add CKEditor URL include to your project's ``urls.py`` file::
    
    (r'^ckeditor/', include('ckeditor.urls')),    

Optional
~~~~~~~~
#. Set the CKEDITOR_RESTRICT_BY_USER setting to ``True`` in the project's ``settings.py`` file (default ``False``). This restricts access to uploaded images to the uploading user (e.g. each user only sees and uploads their own images). Superusers can still see all images. **NOTE**: This restriction is only enforced within the CKEditor media browser. 

#. Add a CKEDITOR_CONFIGS setting to the project's ``settings.py`` file. This specifies sets of CKEditor settings that are passed to CKEditor (see CKEditor's `Setting Configurations <http://docs.cksource.com/CKEditor_3.x/Developers_Guide/Setting_Configurations>`_), i.e.::

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

Managment Commands
~~~~~~~~~~~~~~~~~~
Included is a management command to create thumbnails for images already contained in ``CKEDITOR_UPLOAD_PATH``. This is useful to create thumbnails when starting to use django-ckeditor with existing images. Issue the command as follows::
    
    $ ./manage.py generateckeditorthumbnails

**NOTE**: If you're using custom views remember to include ckeditor.js in your form's media either through ``{{ form.media }}`` or through a ``<script>`` tag. Admin will do this for you automatically. See `Django's Form Media docs <http://docs.djangoproject.com/en/dev/topics/forms/media/>`_ for more info.

Using S3
~~~~~~~~~~~~~~~~~~
See http://django-storages.readthedocs.org/en/latest/


If you want to use allowedContent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
To allowedContent works, disable **stylesheetparser** plugin.
So included this on your settings.py.

CKEDITOR_CONFIGS = {
    "default": {
        "removePlugins": "stylesheetparser",
    }
}
