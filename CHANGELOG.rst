Changelog
=========

5.7.1
-----
#. CKEditor 4.11.4
#. Fix JS handling again
#. Allow using settings to configure ``extra_plugins`` and
   ``external_plugin_resources``


5.7.0
-----
#. Fix Django 1.8 - 1.10 regression
#. Drop leftover support for Django older than 1.8
#. Django 2.2 support
#. Documentation updates
#. Minor fixes to JS handling


5.6.1
-----
#. Fix bad pypi package


5.6.0
-----
#. Django 2.1 compatibility, minimal supported Django version is 1.11 LTS
#. Option to set custom django file backend for CKEditor uploader app.


5.5.0
-----
#. CKEditor 4.9.2
#. Documentation improvements
#. Allow non-string properties of user for CKEDITOR_RESTRICT_BY_USER


5.4.0
-----
#. Django 2.0 compatibility


5.3.1
-----
#. Actually include the code which sets ``CKEDITOR_BASEPATH``.
#. CKEditor 4.7.3


5.3.0
-----
#. CKEditor 4.7
#. Fix storage problems by setting ``CKEDITOR_BASEPATH`` (hopefully for real
   this time)
#. Documentation updates
#. Added a ``CKEDITOR_RESTRICT_BY_DATE`` setting to add uploaded files into
   folders containing the current date.
#. Added a ``CKEDITOR_FILEICONS`` setting that allows overriding the
   icons used by Gallerific.
#. Added a ``CKEDITOR_FILENAME_GENERATOR`` setting which allows
   specifying a callable which mangles the filename of uploaded files.
#. Added ``THUMBNAIL_SIZE`` and ``IMAGE_QUALITY`` settings for the
   Pillow image backend.
#. Actually include static assets for ``ckeditor_uploader`` in the
   pip-installable package.
#. Removed ``CKEDITOR_JQUERY_URL`` and the jQuery dependency. The
   CKEditor activation now uses plain JavaScript. Dependencies are
   `JSON.parse <http://caniuse.com/#search=json.parse>`__ and
   `document.querySelectorAll <http://caniuse.com/#search=querySelectorAll>`__
   which are supported in practically all used browsers these days.
#. Fixed a bug where the CKEditor language was not set individually for
   each request.


5.2.2
-----
#. Django 1.11 support
#. Drop South migrations
#. Fix storage problems by setting CKEDITOR_BASEPATH


5.2.1
-----
#. Fix CKEditor package static path

5.2.0
-----
#. Django 1.10 updates
#. Development dependencies bump
#. CKEditor 4.6.1
#. Paste image support
#. Fix for ManifestStaticFilesStorage


5.1.1
-----
#. Re-add missing additional CkEditor plugins


5.1.0
-----
#. Updated CkEditor to 4.5.10
#. Django 1.10 compatibility changes
#. Documentation updates


5.0.3
-----
#. Fix file/directory browsing and searching
#. Editor width style fixes
#. Added CKEDITOR_BROWSE_SHOW_DIRS
#. Added CKEDITOR_ALLOW_NONIMAGE_FILES
#. Python 2.6 compatibility fix


5.0.2
-----
#. Added template missing in the package


5.0.1
-----
#. Update Readme with backward-incompatible changes


5.0.0 (4.5.3)
-------------
#. Moved file upload code to new Django application - ckeditor_uploader. `RichTextField` doesn't use file upload which have been moved to `RichTextUploadingField`.

File upload support have been moved to ckeditor_uploader. The urls are in ckeditor_uploader.urls while for file uploading widget you have to use RichTextUploadingField from ckeditor_uploader.fields instead of RichTextField from  from ckeditor.fields.

#. Updated ckeditor to 4.5.3 (from https://github.com/ckeditor/ckeditor-dev/tree/4.5.3)
#. Added new plugins from ckeditor maintainers: adobeair, ajax, autoembed, autogrow, autolink, bbcode, codesnippet, codesnippetgeshi, devtools, divarea, docprops, embed, embedbase, embedsemantic, filetools, iframedialog, image2, language, lineutils, mathjax, menubutton, notification, notificationaggregator, placeholder, sharedspace, sourcedialog, stylesheetparser, tableresize, uicolor, uploadimage, uploadwidget, widget, xml
#. Add `zip_safe=False` on setup config, to force does not create ".egg" file
#. Add python Wheel package configuration
#. Add setup.py functions to easy release ".egg" package and Wheel package, and tag version on git ( ``python setup.py publish`` and ``python setup.py tag`` )
#. Improved Tox configuration to code coverage check, code quality check (flake8), imports order check (isort) and test with django master branch
#. Add code quality configurations
#. Add EditorConfig configuration file
#. Refactored code to be in compliance with PEP8

4.5.1
-----
#. Fixed unbound variable in non-image file upload


4.5.0
-----
#. Updated ckeditor to 4.5.1
#. Reverted django.contrib.staticfiles.templatetags.staticfiles.static usage causing problems with some storages
#. Allow non-image files to be upload (the upload widget expects images so the user experience isn't best at the moment)
#. Few refactors and fixes to selenium tests


4.4.8
-----
#. Python 3 compatibility fixes
#. Get static files paths in a proper way
#. Fix Django 1.7 deprecation warning
#. More examples in readme


4.4.7
-----
#. Allow only POST requests on upload view.
#. Exclude hidden files from image browser
#. Prevent caching of image browser view
#. Use lazy JSON encoder to support i18n in CKEditor settings.
#. Misc documentation updates
#. Check for jQuery presence correctly
#. Update to CKEditor 4.4.6

4.4.6
-----
#. Make upload/browse views be staff_member_required by default (can be overridden)
#. Fix ckeditor initialisation code breaking with other jQuery versions.
#. Support grappelli inline form widgets.
#. Remove odd left margin from widget template.
#. Allow running selenium tests with chromium.

4.4.5
-----
#. Post merge package name fix in Readme

4.4.4
-----
#. Update CKEditor to 4.4.4 full package - for all plugins and static files you may need
#. Fixes for inline editor
#. Editor initialisation uses jQuery. You need to specify CKEDITOR_JQUERY_URL for it to work. You can use::

    CKEDITOR_JQUERY_URL = '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js'


4.4.0
-----
#. Update CKEditor to 4.4.1
#. Django 1.7 compatibility fix

4.2.8
-----
#. Update CKEditor to 4.3.3

4.2.7
-----
#. Fix slugifying to empty filename if only bad characters given in filename. Use random string as fallback.
#. Don't use IMG tags for non image files in ckeditor file browser.
#. Remove non-existing image reference from CSS files that broke collectstatic.
#. Misc fixes

4.2.5 / 4.2.6
-------------
#. Fix static files installation - switch from distutils to setuptools

4.2.4
-----
#. Added new demo application with selenium integration test
#. tox setup for Python 3.3 and 2.7 testing
#. Extracted image processing to backends. PIL/Pillow is optional now. Other backends can be added.
#. Fixed a bug with thumbnail generation

4.2.3
-----
#. Python 3.3 compatibility
#. All uploaded files are slugified by default (New settings CKEDITOR_SLUGIFY_FILENAME)
#. Upload file when editing a link (<a href>) now works properly

4.2.2
-----
#. Python 3.3 compatibility in widgets.py

4.2.1
-----
#. Include CKEditor version 4.2.1.
#. Support Django 1.6

4.0.2
-----
#. Include CKEditor version 4.0.2.

3.6.2.1
-------
#. Remove unwanted static files from distribution.
#. Use Pillow instead of PIL since it builds on all systems.

3.6.2
-----
#. Include CKEditor version 3.6.2.
#. Initial work on Django aligned theme.
#. Fix schema slash removal issue on media url generation. Thanks `mwcz <https://github.com/mwcz>`__
#. Added compatibility for South. Thanks `3point2 <https://github.com/3point2>`__
#. Prevented settings from leaking between widget instances. Thanks `3point2 <https://github.com/3point2>`__
#. Fixed config_name conflict when verbose_name is used as first positional argument for a field. Thanks `3point2 <https://github.com/3point2>`__
#. Refactored views to allow use of file walking with local paths. Thanks `3point2 <https://github.com/3point2>`__
#. Added command to generate thumbnails. Thanks `3point2 <https://github.com/3point2>`__
#. Migrated from using media to static file management.

0.0.9
-----

#. Added ability to configure CKeditor through a CKEDITOR_CONFIGS settings. Thanks `jeffh <https://github.com/jeffh>`__ for the input.

0.0.8
-----

#. Removed buggy url include check.

0.0.7
-----
#. Egg package corrected to exclude testing admin.py and models.py.

0.0.6
-----
#. Enforce correct configuration.
#. Changed upload behavior to separate files into directories by upload date. Thanks `loop0 <http://github.com/loop0>`__ .
#. Added ability to limit user access to uploaded content (see the CKEDITOR_RESTRICT_BY_USER setting). Thanks `chr15m <http://github.com/chr15m>`__ for the input.
#. Added initial set of much needed tests.
#. General cleanup, light refactor.

0.0.5
-----
#. csrf_exempt backwards compatability. Thanks `chr15m <http://github.com/chr15m>`__ .

0.0.4
-----
#. Include resources, sorry about that.

0.0.3
-----
#. More robust PIL import. Thanks `buchuki <http://github.com/buchuki>`__ .
#. Better CKEDITOR_MEDIA_PREFIX setting error.

0.0.2
-----
#. Included README.rst in manifest.

0.0.1
-----
#. Added CKEDITOR_UPLOAD_PREFIX setting. Thanks `chr15m <http://github.com/chr15m>`__ for the input.

