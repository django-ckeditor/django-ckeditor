# Installation Guide

## Required

1. Install or add django-ckeditor to your python path.

2. Add ``ckeditor`` to your ``INSTALLED_APPS`` setting.

3. Add a CKEDITOR_UPLOAD_PATH setting to the project's ``settings.py`` file. This setting specifies an relative path to your CKEditor media upload directory. CKEditor uses Django storage API. By default Django uses file system storage backend (it will use your MEDIA_ROOT and MEDIA_URL) and if you don't use different backend you have to have write permissions for the CKEDITOR_UPLOAD_PATH path within MEDIA_ROOT, i.e.::


    CKEDITOR_UPLOAD_PATH = "uploads/"

   For the default file system storage images will be uploaded to "uploads" folder in your MEDIA_ROOT and urls will be created against MEDIA_URL (/media/uploads/image.jpg).

   CKEditor has been tested with django FileSystemStorage and S3BotoStorage.
   There are issues using S3Storage from django-storages.

4. Run the ``collectstatic`` management command: ``$ /manage.py collectstatic``. This'll copy static CKEditor require media resources into the directory given by the ``STATIC_ROOT`` setting. See `Django's documentation on managing static files <https://docs.djangoproject.com/en/dev/howto/static-files>`_ for more info.

5. Add CKEditor URL include to your project's ``urls.py`` file::

    (r'^ckeditor/', include('ckeditor_uploader.urls')),

6. Note that by adding those URLs you add views that can upload and browse through uploaded images. Since django-ckeditor 4.4.6 those views are staff_member_required. If you want different permission decorator (login_required, user_passes_test etc.) then add views defined in `ckeditor.urls` manualy to you urls.py.

7. Set ``CKEDITOR_IMAGE_BACKEND`` to one of supported backends to enable thumbnails in ckeditor gallery. By default no thumbnails are created and full size images are used as preview. Supported backends:

   - ``pillow``: uses PIL or Pillow

8. **django-ckeditor uses jQuery in ckeditor-init.js file. You must set ``CKEDITOR_JQUERY_URL`` to a jQuery URL that will be used to load the library**. If you have jQuery loaded from a different source just don't set [CKEDITOR_JQUERY_URL] and django-ckeditor will not try to load its own jQuery. If you find that CKEditor widgets don't appear in your Django admin site then check that this variable is set correctly. Example::

       CKEDITOR_JQUERY_URL = 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js'


## Optional

1. All uploaded files are slugified by defaults, to disable this feature set ``CKEDITOR_UPLOAD_SLUGIFY_FILENAME`` to ``False``

2. Set the CKEDITOR_RESTRICT_BY_USER setting to ``True`` in the project's ``settings.py`` file (default ``False``). This restricts access to uploaded images to the uploading user (e.g. each user only sees and uploads their own images). Superusers can still see all images. **NOTE**: This restriction is only enforced within the CKEditor media browser.

3. Add a CKEDITOR_CONFIGS setting to the project's ``settings.py`` file. This specifies sets of CKEditor settings that are passed to CKEditor (see CKEditor's `Setting Configurations <http://docs.cksource.com/CKEditor_3.x/Developers_Guide/Setting_Configurations>`_), i.e.::

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

4. To restrict upload functionality to image files only, add ``CKEDITOR_ALLOW_NONIMAGE_FILES = False`` in your settings.py file. Currently non-image files are allowed by default.
