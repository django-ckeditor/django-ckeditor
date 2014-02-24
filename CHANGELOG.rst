Changelog
=========

4.2.7
-----
#. Fix slugifying to empty filename if only bad characters given in filename. Use random string as fallback.
#. Don't use IMG tags for non image files in ckeditor file browser.
#. Remove non-existing image reference from CSS files that broke collectstatic.
#. Misc fixes

4.2.5 / 4.2.6
-----
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
#. Fix schema slash removal issue on media url generation. Thanks `mwcz <https://github.com/mwcz>`_
#. Added compatibility for South. Thanks `3point2 <https://github.com/3point2>`_
#. Prevented settings from leaking between widget instances. Thanks `3point2 <https://github.com/3point2>`_
#. Fixed config_name conflict when verbose_name is used as first positional argument for a field. Thanks `3point2 <https://github.com/3point2>`_
#. Refactored views to allow use of file walking with local paths. Thanks `3point2 <https://github.com/3point2>`_
#. Added command to generate thumbnails. Thanks `3point2 <https://github.com/3point2>`_
#. Migrated from using media to static file management.

0.0.9
-----

#. Added ability to configure CKeditor through a CKEDITOR_CONFIGS settings. Thanks `jeffh <https://github.com/jeffh>`_ for the input.

0.0.8
-----

#. Removed buggy url include check.

0.0.7
-----
#. Egg package corrected to exclude testing admin.py and models.py.

0.0.6
-----
#. Enforce correct configuration.
#. Changed upload behavior to separate files into directories by upload date. Thanks `loop0 <http://github.com/loop0>`_ .
#. Added ability to limit user access to uploaded content (see the CKEDITOR_RESTRICT_BY_USER setting). Thanks `chr15m <http://github.com/chr15m>`_ for the input.
#. Added initial set of much needed tests.
#. General cleanup, light refactor.

0.0.5
-----
#. csrf_exempt backwards compatability. Thanks `chr15m <http://github.com/chr15m>`_ .

0.0.4
-----
#. Include resources, sorry about that.

0.0.3
-----
#. More robust PIL import. Thanks `buchuki <http://github.com/buchuki>`_ .
#. Better CKEDITOR_MEDIA_PREFIX setting error.

0.0.2
-----
#. Included README.rst in manifest.

0.0.1
-----
#. Added CKEDITOR_UPLOAD_PREFIX setting. Thanks `chr15m <http://github.com/chr15m>`_ for the input.

