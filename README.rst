Django CKEditor
===============

**NOTICE: django-ckeditor 5 has backward incompatible code moves against 4.5.1.**


File upload support have been moved to ckeditor_uploader.  The urls are in ckeditor_uploader.urls while for file uploading widget you have to use RichTextUploadingField instead of RichTextField.


**Django admin CKEditor integration.**
Provides a ``RichTextField``, ``RichTextUploadingField``, ``CKEditorWidget`` and ``CKEditorUploadingWidget`` utilizing CKEditor with image upload and browsing support included.

* This version also includes:
#. support to django-storages (works with S3)
#. updated ckeditor to version 4.5.3
#. included all ckeditor language and plugin files to made everyone happy! ( `only the plugins maintained by the ckeditor develops team <https://github.com/ckeditor/ckeditor-dev/tree/4.5.3/plugins>`_ )

.. contents:: Contents
    :depth: 5

Installation
------------

Required
~~~~~~~~
#. Install or add django-ckeditor to your python path.
    
    pip install django-ckeditor

#. Add ``ckeditor`` to your ``INSTALLED_APPS`` setting.

#. **django-ckeditor uses jQuery in ckeditor-init.js file. You must set ``CKEDITOR_JQUERY_URL`` to a jQuery URL that will be used to load the library**. If you have jQuery loaded from a different source just don't set [CKEDITOR_JQUERY_URL] and django-ckeditor will not try to load its own jQuery. If you find that CKEditor widgets don't appear in your Django admin site then check that this variable is set correctly. Example::

       CKEDITOR_JQUERY_URL = '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js'

#. Run the ``collectstatic`` management command: ``$ ./manage.py collectstatic``. This will copy static CKEditor required media resources into the directory given by the ``STATIC_ROOT`` setting. See `Django's documentation on managing static files <https://docs.djangoproject.com/en/dev/howto/static-files>`_ for more info.


Required for using widget with file upload
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Add ``ckeditor_uploader`` to your ``INSTALLED_APPS`` setting.

#. Add a CKEDITOR_UPLOAD_PATH setting to the project's ``settings.py`` file. This setting specifies an relative path to your CKEditor media upload directory. CKEditor uses Django storage API. By default Django uses file system storage backend (it will use your MEDIA_ROOT and MEDIA_URL) and if you don't use different backend you have to have write permissions for the CKEDITOR_UPLOAD_PATH path within MEDIA_ROOT, i.e.::


    CKEDITOR_UPLOAD_PATH = "uploads/"

   For the default file system storage images will be uploaded to "uploads" folder in your MEDIA_ROOT and urls will be created against MEDIA_URL (/media/uploads/image.jpg).

   CKEditor has been tested with django FileSystemStorage and S3BotoStorage.
   There are issues using S3Storage from django-storages.

#. For the default filesystem storage configuration ``MEDIA_ROOT`` and ``MEDIA_URL`` must be set correctly for the media files to work (like those uploaded by the ckeditor widget).

#. Add CKEditor URL include to your project's ``urls.py`` file::

    (r'^ckeditor/', include('ckeditor_uploader.urls')),

#. Note that by adding those URLs you add views that can upload and browse through uploaded images. Since django-ckeditor 4.4.6 those views are staff_member_required. If you want different permission decorator (login_required, user_passes_test etc.) then add views defined in `ckeditor.urls` manually to your urls.py.

#. Set ``CKEDITOR_IMAGE_BACKEND`` to one of supported backends to enable thumbnails in ckeditor gallery. By default no thumbnails are created and full size images are used as preview. Supported backends:

   - ``pillow``: uses PIL or Pillow


Optional - customizing CKEditor editor
--------------------------------------

#. Add a CKEDITOR_CONFIGS setting to the project's ``settings.py`` file. This specifies sets of CKEditor settings that are passed to CKEditor (see CKEditor's `Setting Configurations <http://docs.ckeditor.com/#!/guide/dev_configuration>`_), i.e.::

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


Optional for file upload
~~~~~~~~~~~~~~~~~~~~~~~~
#. All uploaded files are slugified by default. To disable this feature, set ``CKEDITOR_UPLOAD_SLUGIFY_FILENAME`` to ``False``.

#. Set the ``CKEDITOR_RESTRICT_BY_USER`` setting to ``True`` in the project's ``settings.py`` file (default ``False``). This restricts access to uploaded images to the uploading user (e.g. each user only sees and uploads their own images). Superusers can still see all images. **NOTE**: This restriction is only enforced within the CKEditor media browser.

#. Set the ``CKEDITOR_BROWSE_SHOW_DIRS`` setting to ``True`` to show directories on the "Browse Server" page. This enables image grouping by directory they are stored in, sorted by date.

Usage
-----

Field
~~~~~
The quickest way to add rich text editing capabilities to your models is to use the included ``RichTextField`` model field type. A CKEditor widget is rendered as the form field but in all other regards the field behaves as the standard Django ``TextField``. For example::

    from django.db import models
    from ckeditor.fields import RichTextField

    class Post(models.Model):
        content = RichTextField()

**For file upload support use ``RichTextUploadingField`` from ckeditor_uploader.fields**


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


Outside of django admin
~~~~~~~~~~~~~~~~~~~~~~~

When you are rendering form outside of admin panel you will have to make sure that all form media is present for the editor to work. One of the way how to achieve this is following::

    <form>
        {{ myform.media }}
        {{ myform.as_p }}
        <input type="submit"/>
    </form>

or you can load the media manually at it is done in demo app::
        
    {% load staticfiles %}
    <script type="text/javascript" src="{% static "ckeditor/ckeditor/ckeditor.js" %}"></script>
    <script type="text/javascript" src="{% static "ckeditor/ckeditor-init.js" %}"></script>



Management Commands
~~~~~~~~~~~~~~~~~~~
Included is a management command to create thumbnails for images already contained in ``CKEDITOR_UPLOAD_PATH``. This is useful to create thumbnails when starting to use django-ckeditor with existing images. Issue the command as follows::

    $ ./manage.py generateckeditorthumbnails

**NOTE**: If you're using custom views remember to include ckeditor.js in your form's media either through ``{{ form.media }}`` or through a ``<script>`` tag. Admin will do this for you automatically. See `Django's Form Media docs <http://docs.djangoproject.com/en/dev/topics/forms/media/>`_ for more info.

Using S3
~~~~~~~~
See http://django-storages.readthedocs.org/en/latest/

**NOTE:** ``django-ckeditor`` will not work with S3 through ``django-storages`` without this line in ``settings.py``::  

    AWS_QUERYSTRING_AUTH = False

If you want to use allowedContent
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
To allowedContent works, disable **stylesheetparser** plugin.
So included this on your settings.py.::

    CKEDITOR_CONFIGS = {
        "default": {
            "removePlugins": "stylesheetparser",
        }
    }


Plugins:
--------

django-ckeditor send by default the following ckeditor plugins, however, not all are enabled by default::

    a11yhelp, about, adobeair, ajax, autoembed, autogrow, autolink, bbcode, clipboard, codesnippet, codesnippetgeshi, colordialog, devtools, dialog, div, divarea, docprops, embed, embedbase, embedsemantic, filetools, find, flash, forms, iframe, iframedialog, image, image2, language, lineutils, link, liststyle, magicline, mathjax, menubutton, notification, notificationaggregator, pagebreak, pastefromword, placeholder, preview, scayt, sharedspace, showblocks, smiley, sourcedialog, specialchar, stylesheetparser, table, tableresize, tabletools, templates, uicolor, uploadimage, uploadwidget, widget, wsc, xml


Restricting file upload
-----------------------
#. To restrict upload functionality to image files only, add ``CKEDITOR_ALLOW_NONIMAGE_FILES = False`` in your settings.py file. Currently non-image files are allowed by default.

#. By default the upload and browse URLs use staff_member_required decorator - ckeditor_uploader/urls.py - if you want other decorators just insert two urls found in that urls.py and not include it.


Demo / Test application
-----------------------
If you clone the repository you will be able to run the ``ckeditor_demo`` application.

#. ``pip install -r ckeditor_demo_requirements.txt``

#. Run ``python manage.py migrate``

#. Create a superuser if you want to test the widget in the admin panel

#. Start the development server.

There is a forms.Form on main page (/) and a model in admin that uses the widget for a model field.
Database is set to sqlite3 and STATIC/MEDIA_ROOT to folders in temporary directory.



Running selenium test
---------------------
You can run the test with ``python manage.py test ckeditor_demo`` (for repo checkout only) or with ``tox`` which is configured to run with Python 2.7 and 3.4.


Running code quality tests
--------------------------

Create a new virtualenv, install `tox <https://pypi.python.org/pypi/tox>`_ and run ``tox -e py27-lint`` to `Flake8 (pep8 and others quality check) <https://pypi.python.org/pypi/flake8>`_ tests or ``tox -e py27-isort`` to `isort (import order check) <https://pypi.python.org/pypi/isort>`_ tests


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
            'extraPlugins': ','.join(
                [
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
