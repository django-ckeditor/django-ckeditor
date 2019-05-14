Django CKEditor
===============

**NOTICE: django-ckeditor 5 has backwards incompatible code moves against 4.5.1.**


File upload support has been moved to ckeditor_uploader.  The urls are in ckeditor_uploader.urls, while for the file uploading widget you have to use RichTextUploadingField instead of RichTextField.


**Django admin CKEditor integration.**
Provides a ``RichTextField``, ``RichTextUploadingField``, ``CKEditorWidget`` and ``CKEditorUploadingWidget`` utilizing CKEditor with image uploading and browsing support included.

This version also includes:

#. support to django-storages (works with S3)
#. updated ckeditor to version 4.9
#. included all ckeditor language and plugin files to made everyone happy! ( `only the plugins maintained by the ckeditor develops team <https://github.com/ckeditor/ckeditor-dev/tree/4.6.2/plugins>`__ )

.. contents:: Contents
   :depth: 5

Installation
------------

Required
~~~~~~~~
#. Install or add django-ckeditor to your python path.
   ::

        pip install django-ckeditor

#. Add ``ckeditor`` to your ``INSTALLED_APPS`` setting.

#. Run the ``collectstatic`` management command: ``$ ./manage.py collectstatic``. This will copy static CKEditor required media resources into the directory given by the ``STATIC_ROOT`` setting. See `Django's documentation on managing static files <https://docs.djangoproject.com/en/dev/howto/static-files>`__ for more info.

#. CKEditor needs to know where its assets are located because it loads them
   lazily only when needed. The location is determined in the ``ckeditor-init.js``
   script. and defaults to ``static/ckeditor/ckeditor/``. This does not work all
   the time, for example when using ``ManifestStaticFilesStorage``, any asset
   packaging pipeline or whatnot. django-ckeditor is quite good at automatically
   detecting the correct place even then, but sometimes you have to hardcode
   ``CKEDITOR_BASEPATH`` somewhere. This can be hardcoded in settings, i.e.::

        CKEDITOR_BASEPATH = "/my_static/ckeditor/ckeditor/"

   It is possible to override
   the ``admin/change_form.html`` template with your own if you really need to do
   this, i.e.::

        {% extends "admin/change_form.html" %}

        {% block extrahead %}
        <script>window.CKEDITOR_BASEPATH = '/my_static/ckeditor/ckeditor/';</script>
        {{ block.super }}
        {% endblock %}

   Of course you should adapt this snippet to your needs when using
   CKEditor outside the admin app.


Required for using widget with file upload
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Add ``ckeditor_uploader`` to your ``INSTALLED_APPS`` setting.

#. Add a ``CKEDITOR_UPLOAD_PATH`` setting to the project's ``settings.py`` file. This setting specifies a relative path to your CKEditor media upload directory. CKEditor uses Django's storage API. By default, Django uses the file system storage backend (it will use your ``MEDIA_ROOT`` and ``MEDIA_URL``) and if you don't use a different backend you have to have write permissions for the ``CKEDITOR_UPLOAD_PATH`` path within ``MEDIA_ROOT``, i.e.::

        CKEDITOR_UPLOAD_PATH = "uploads/"

   When using default file system storage, images will be uploaded to "uploads" folder in your ``MEDIA_ROOT`` and urls will be created against ``MEDIA_URL`` (``/media/uploads/image.jpg``).

   If you want be able for have control for filename generation, you have to add into settings yours custom filename generator::

        # utils.py

        def get_filename(filename):
            return filename.upper()

   ::

        # settings.py

        CKEDITOR_FILENAME_GENERATOR = 'utils.get_filename'

   CKEditor has been tested with django FileSystemStorage and S3BotoStorage.
   There are issues using S3Storage from django-storages.

#. For the default filesystem storage configuration, ``MEDIA_ROOT`` and ``MEDIA_URL`` must be set correctly for the media files to work (like those uploaded by the ckeditor widget).

#. Add CKEditor URL include to your project's ``urls.py`` file::

    url(r'^ckeditor/', include('ckeditor_uploader.urls')),

#. Note that by adding those URLs you add views that can upload and browse through uploaded images. Since django-ckeditor 4.4.6, those views are decorated using ``@staff_member_required``. If you want a different permission decorator (``login_required``, ``user_passes_test`` etc.) then add views defined in ``ckeditor.urls`` manually to your urls.py.


Optional - customizing CKEditor editor
--------------------------------------

#. Add a CKEDITOR_CONFIGS setting to the project's ``settings.py`` file. This specifies sets of CKEditor settings that are passed to CKEditor (see CKEditor's `Setting Configurations <http://docs.ckeditor.com/#!/guide/dev_configuration>`__), i.e.::

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
               'toolbar': 'full',
               'height': 300,
               'width': 300,
           },
       }

   It is possible to create a custom toolbar ::

        CKEDITOR_CONFIGS = {
            'default': {
                'toolbar': 'Custom',
                'toolbar_Custom': [
                    ['Bold', 'Italic', 'Underline'],
                    ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
                    ['Link', 'Unlink'],
                    ['RemoveFormat', 'Source']
                ]
            }
        }

   If you want or need plugins which are not part of django-ckeditor's
   plugin set you may specify assets and plugins as follows::

        text = RichTextField(
            config_name='forum-post',

            # CKEDITOR.config.extraPlugins:
            extra_plugins=['someplugin'],

            # CKEDITOR.plugins.addExternal(...)
            external_plugin_resources=[(
                'someplugin',
                '/static/.../path-to-someplugin/',
                'plugin.js',
            )],
        )

    Alternatively, those settings can also be provided through
    ``CKEDITOR_CONFIGS``.


Optional for file upload
~~~~~~~~~~~~~~~~~~~~~~~~
#. All uploaded files are slugified by default. To disable this feature, set ``CKEDITOR_UPLOAD_SLUGIFY_FILENAME`` to ``False``.

#. Set the ``CKEDITOR_RESTRICT_BY_USER`` setting to ``True`` in the project's ``settings.py`` file (default ``False``). This restricts access to uploaded images to the uploading user (e.g. each user only sees and uploads their own images).  Upload paths are prefixed by the string returned by ``get_username``.  If ``CKEDITOR_RESTRICT_BY_USER`` is set to a string, the named property is used instead.  Superusers can still see all images. **NOTE**: This restriction is only enforced within the CKEditor media browser.

#. Set the ``CKEDITOR_BROWSE_SHOW_DIRS`` setting to ``True`` to show directories on the "Browse Server" page. This enables image grouping by directory they are stored in, sorted by date.

#. Set the ``CKEDITOR_RESTRICT_BY_DATE`` setting to ``True`` to bucked uploaded files by year/month/day.

#. You can set a custom file storage for CKEditor uploader by defining it under ``CKEDITOR_STORAGE_BACKEND`` variable in settings.

#. You can set ``CKEDITOR_IMAGE_BACKEND`` to one of the supported backends to enable thumbnails in ckeditor gallery.
   By default no thumbnails are created and full size images are used as preview.
   Supported backends:

   - ``pillow``: Uses Pillow

#. With the ``pillow`` backend, you can change the thumbnail size with the ``CKEDITOR_THUMBNAIL_SIZE`` setting (formerly ``THUMBNAIL_SIZE``).
   Default value: (75, 75)

#. With the ``pillow`` backend, you can convert and compress the uploaded images to jpeg, to save disk space.
   Set the ``CKEDITOR_FORCE_JPEG_COMPRESSION`` setting to ``True`` (default ``False``)
   You can change the ``CKEDITOR_IMAGE_QUALITY`` setting (formerly ``IMAGE_QUALITY``), which is passed to Pillow:

    The image quality, on a scale from 1 (worst) to 95 (best). The default is 75. Values above 95
    should be avoided; 100 disables portions of the JPEG compression algorithm, and results in
    large files with hardly any gain in image quality.

   This feature is disabled for animated images.

Usage
-----

Field
~~~~~
The quickest way to add rich text editing capabilities to your models is to use the included ``RichTextField`` model field type. A CKEditor widget is rendered as the form field but in all other regards the field behaves as the standard Django ``TextField``. For example::

    from django.db import models
    from ckeditor.fields import RichTextField

    class Post(models.Model):
        content = RichTextField()

**For file upload support** use ``RichTextUploadingField`` from ``ckeditor_uploader.fields``.


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
            fields = '__all__'

    class PostAdmin(admin.ModelAdmin):
        form = PostAdminForm

    admin.site.register(Post, PostAdmin)

**For file upload support** use ``CKEditorUploadingWidget`` from ``ckeditor_uploader.widgets``.


**Overriding widget template**

In Django 1.11 and 2.x for overriding ``ckeditor/widget.html`` you have two ways:


#. Place ``ckeditor/widget.html`` in  ``BASE_DIR/templates``

   - Change ``FORM_RENDERER`` to ``TemplateSettings``.

   ::

       FORM_RENDERER = 'django.forms.renderers.TemplatesSetting'


   - Include ``templates`` folder in ``DIRS``

   ::

       TEMPLATES = [{
           ...
           'DIRS': [os.path.join(BASE_DIR, 'templates'), ],
           ...
       }]


   - Add ``'django.forms'`` to ``INSTALLED_APPS``.


#. Place ``ckeditor/widget.html`` in ``your_app/templates`` and place ``'your_app'`` **before** ``'ckeditor'`` and ``'ckeditor_uploader'`` in ``INSTALLED_APPS``.



Outside of django admin
~~~~~~~~~~~~~~~~~~~~~~~

When you are rendering a form outside the admin panel, you'll have to make sure all form media is present for the editor to work. One way to achieve this is like this::

    <form>
        {{ myform.media }}
        {{ myform.as_p }}
        <input type="submit"/>
    </form>

or you can load the media manually as it is done in the demo app::

    {% load static %}
    <script type="text/javascript" src="{% static "ckeditor/ckeditor-init.js" %}"></script>
    <script type="text/javascript" src="{% static "ckeditor/ckeditor/ckeditor.js" %}"></script>

When you need to render ``RichTextField``'s HTML output in your templates safely, just use ``{{ content|safe }}``,  `Django's safe filter <https://docs.djangoproject.com/en/2.0/ref/templates/builtins/#std:templatefilter-safe>`_


Management Commands
~~~~~~~~~~~~~~~~~~~
Included is a management command to create thumbnails for images already contained in ``CKEDITOR_UPLOAD_PATH``. This is useful to create thumbnails when using django-ckeditor with existing images. Issue the command as follows::

    $ ./manage.py generateckeditorthumbnails

**NOTE**: If you're using custom views remember to include ckeditor.js in your form's media either through ``{{ form.media }}`` or through a ``<script>`` tag. Admin will do this for you automatically. See `Django's Form Media docs <http://docs.djangoproject.com/en/dev/topics/forms/media/>`__ for more info.

Using S3
~~~~~~~~
See https://django-storages.readthedocs.org/en/latest/

**NOTE:** ``django-ckeditor`` will not work with S3 through ``django-storages`` without this line in ``settings.py``::

    AWS_QUERYSTRING_AUTH = False

If you want to use allowedContent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
To get allowedContent to work, disable **stylesheetparser** plugin.
So include this in your settings.py.::

    CKEDITOR_CONFIGS = {
        "default": {
            "removePlugins": "stylesheetparser",
        }
    }


Plugins:
--------

django-ckeditor includes the following ckeditor plugins, but not all are enabled by default::

    a11yhelp, about, adobeair, ajax, autoembed, autogrow, autolink, bbcode, clipboard, codesnippet,
    codesnippetgeshi, colordialog, devtools, dialog, div, divarea, docprops, embed, embedbase,
    embedsemantic, filetools, find, flash, forms, iframe, iframedialog, image, image2, language,
    lineutils, link, liststyle, magicline, mathjax, menubutton, notification, notificationaggregator,
    pagebreak, pastefromword, placeholder, preview, scayt, sharedspace, showblocks, smiley,
    sourcedialog, specialchar, stylesheetparser, table, tableresize, tabletools, templates, uicolor,
    uploadimage, uploadwidget, widget, wsc, xml

The image/file upload feature is done by the `uploadimage` plugin.


Restricting file upload
-----------------------

#. To restrict upload functionality to image files only, add ``CKEDITOR_ALLOW_NONIMAGE_FILES = False`` in your settings.py file. Currently non-image files are allowed by default.

#. By default the upload and browse URLs use staff_member_required decorator - ckeditor_uploader/urls.py - if you want other decorators just insert two urls found in that urls.py and don't include it.


Demo / Test application
-----------------------

If you clone the repository you will be able to run the ``ckeditor_demo`` application.

#. ``pip install -r ckeditor_demo_requirements.txt``

#. Run ``python manage.py migrate``

#. Create a superuser if you want to test the widget in the admin panel

#. Start the development server.

There is a forms.Form on the main page (/) and a model in admin that uses the widget for a model field.
Database is set to sqlite3 and STATIC/MEDIA_ROOT to folders in temporary directory.



Running selenium test
---------------------

You can run the test with ``python manage.py test ckeditor_demo`` (for repo checkout only) or with ``tox`` which is configured to run with Python 2.7 and 3.4.


Running code quality tests
--------------------------

Create a new virtualenv, install `tox <https://pypi.python.org/pypi/tox>`__ and run ``tox -e py27-lint`` to `Flake8 (pep8 and other quality checks) <https://pypi.python.org/pypi/flake8>`__ tests or ``tox -e py27-isort`` to `isort (import order check) <https://pypi.python.org/pypi/isort>`__ tests


Troubleshooting
---------------

If your browser has problems displaying uploaded images in the image upload window you may need to change Django settings:

::

    X_FRAME_OPTIONS = 'SAMEORIGIN'

More on https://docs.djangoproject.com/en/1.11/ref/clickjacking/#setting-x-frame-options-for-all-responses


Example ckeditor configuration
------------------------------

::

    CKEDITOR_CONFIGS = {
        'default': {
            'skin': 'moono',
            # 'skin': 'office2013',
            'toolbar_Basic': [
                ['Source', '-', 'Bold', 'Italic']
            ],
            'toolbar_YourCustomToolbarConfig': [
                {'name': 'document', 'items': ['Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates']},
                {'name': 'clipboard', 'items': ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']},
                {'name': 'editing', 'items': ['Find', 'Replace', '-', 'SelectAll']},
                {'name': 'forms',
                 'items': ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton',
                           'HiddenField']},
                '/',
                {'name': 'basicstyles',
                 'items': ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']},
                {'name': 'paragraph',
                 'items': ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-',
                           'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl',
                           'Language']},
                {'name': 'links', 'items': ['Link', 'Unlink', 'Anchor']},
                {'name': 'insert',
                 'items': ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe']},
                '/',
                {'name': 'styles', 'items': ['Styles', 'Format', 'Font', 'FontSize']},
                {'name': 'colors', 'items': ['TextColor', 'BGColor']},
                {'name': 'tools', 'items': ['Maximize', 'ShowBlocks']},
                {'name': 'about', 'items': ['About']},
                '/',  # put this to force next toolbar on new line
                {'name': 'yourcustomtools', 'items': [
                    # put the name of your editor.ui.addButton here
                    'Preview',
                    'Maximize',

                ]},
            ],
            'toolbar': 'YourCustomToolbarConfig',  # put selected toolbar config here
            # 'toolbarGroups': [{ 'name': 'document', 'groups': [ 'mode', 'document', 'doctools' ] }],
            # 'height': 291,
            # 'width': '100%',
            # 'filebrowserWindowHeight': 725,
            # 'filebrowserWindowWidth': 940,
            # 'toolbarCanCollapse': True,
            # 'mathJaxLib': '//cdn.mathjax.org/mathjax/2.2-latest/MathJax.js?config=TeX-AMS_HTML',
            'tabSpaces': 4,
            'extraPlugins': ','.join([
                'uploadimage', # the upload image feature
                # your extra plugins here
                'div',
                'autolink',
                'autoembed',
                'embedsemantic',
                'autogrow',
                # 'devtools',
                'widget',
                'lineutils',
                'clipboard',
                'dialog',
                'dialogui',
                'elementspath'
            ]),
        }
    }
