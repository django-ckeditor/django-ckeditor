Django CKEditor
===============
* riklaunim / django-ckeditor is on PyPi as https://pypi.python.org/pypi/django-ckeditor-updated - latest code, works with latest Django
* shaunsephton / django-ckeditor is on PyPi as https://pypi.python.org/pypi/django-ckeditor - still old release not compatible with newer Django versions


**This fork, django-ckeditor-updated, has different configuration than the old django ckeditor. All of my changes were recently merged to shaunsephton repository
but they havent been released yet as a package. Until django-ckeditor won't get new and constant releases I'be maintaining this fork.***


**Django admin CKEditor integration.**
Provides a ``RichTextField`` and ``CKEditorWidget`` utilizing CKEditor with image upload and browsing support included.

* This version also includes:
#. support to django-storages (works with S3)
#. updated ckeditor to version 4.4
#. included all ckeditor language files to made everyone happy!

.. contents:: Contents
    :depth: 5

Installation
------------

Required
~~~~~~~~
#. Install or add django-ckeditor-updated to your python path. Note: You may not have the original django-ckeditor and django-ckeditor-updated installed at the same time.

#. Add ``ckeditor`` to your ``INSTALLED_APPS`` setting.

#. Run the ``collectstatic`` management command: ``$ /manage.py collectstatic``. This'll copy static CKEditor require media resources into the directory given by the ``STATIC_ROOT`` setting. See `Django's documentation on managing static files <https://docs.djangoproject.com/en/dev/howto/static-files>`_ for more info.

#. Add a CKEDITOR_UPLOAD_PATH setting to the project's ``settings.py`` file. This setting specifies an relative path to your CKEditor media upload directory. CKEditor uses Django storage API. By default Django uses file system storage backend (it will use your MEDIA_ROOT and MEDIA_URL) and if you don't use different backend you have to have write permissions for the CKEDITOR_UPLOAD_PATH path within MEDIA_ROOT, i.e.::


    CKEDITOR_UPLOAD_PATH = "uploads/"

   For the default file system storage images will be uploaded to "uploads" folder in your MEDIA_ROOT and urls will be created against MEDIA_URL (/media/uploads/image.jpg).

   CKEditor has been tested with django FileSystemStorage and S3BotoStorage.
   There are issues using S3Storage from django-storages.

#. Add CKEditor URL include to your project's ``urls.py`` file::

    (r'^ckeditor/', include('ckeditor.urls')),

#. Set ``CKEDITOR_IMAGE_BACKEND`` to one of supported backends to enable thumbnails in ckeditor gallery. By default no thumbnails are created and full size images are used as preview. Supported backends:

   - ``pillow``: uses PIL or Pillow


Optional
~~~~~~~~
#. All uploaded files are slugified by defaults, to disable this feature set ``CKEDITOR_SLUGIFY_FILENAME`` to ``False``

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
~~~~~~~~
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


Demo / Test application
~~~~~~~~~~~~~~~~~~~~~~~
If you clone the repository you will be able to run the ``ckeditor_demo`` application.

#. ``pip install -r ckeditor_demo_requirements.txt``

#. Run ``python.manage.py syncdb``

#. Create a superuser if you want to test the widget in the admin panel

#. Start the development server.

There is a forms.Form on main page (/) and a model in admin that uses the widget for a model field.
Database is set to sqlite3 and STATIC/MEDIA_ROOT to folders in temporary directory.


Running selenium test
~~~~~~~~~~~~~~~~~~~~~

You can run the test with ``python manage.py test ckeditor_demo`` (for repo checkout only) or with ``tox`` which is configured to run with Python 2.7 and 3.3.
(You may have to fix some imports in selenium webdriver for Python 3.3).
