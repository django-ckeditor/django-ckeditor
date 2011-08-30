import os
import unittest
from datetime import datetime

from django.conf import settings

from ckeditor import views


class ViewsTestCase(unittest.TestCase):
    def setUp(self):
        # Retain original settings.
        self.orig_MEDIA_ROOT = settings.MEDIA_ROOT
        self.orig_CKEDITOR_UPLOAD_PATH = settings.CKEDITOR_UPLOAD_PATH
        self.orig_MEDIA_URL = settings.MEDIA_URL
        self.orig_CKEDITOR_RESTRICT_BY_USER = getattr(settings, \
                'CKEDITOR_RESTRICT_BY_USER', False)

        # Set some test settings.
        settings.MEDIA_ROOT = '/media/root/'
        settings.CKEDITOR_UPLOAD_PATH = os.path.join(settings.MEDIA_ROOT, \
                'uploads')
        settings.MEDIA_URL = '/media/'

        # Create dummy test upload path.
        self.test_path = os.path.join(settings.CKEDITOR_UPLOAD_PATH, \
                'arbitrary', 'path', 'and', 'filename.ext')

        # Create mock user.
        self.mock_user = type('User', (object,), dict(username='test_user', \
                is_superuser=False))

    def tearDown(self):
        # Reset original settings.
        settings.MEDIA_ROOT = self.orig_MEDIA_ROOT
        settings.CKEDITOR_UPLOAD_PATH = self.orig_CKEDITOR_UPLOAD_PATH
        settings.MEDIA_URL = self.orig_MEDIA_URL
        settings.CKEDITOR_RESTRICT_BY_USER = \
                self.orig_CKEDITOR_RESTRICT_BY_USER

    def test_get_media_url(self):
        # If provided prefix URL with CKEDITOR_UPLOAD_PREFIX.
        settings.CKEDITOR_UPLOAD_PREFIX = '/media/ckuploads/'
        prefix_url = '/media/ckuploads/arbitrary/path/and/filename.ext'
        self.failUnless(views.get_media_url(self.test_path) == prefix_url)

        # If CKEDITOR_UPLOAD_PREFIX is not provided, the media URL will fall
        # back to MEDIA_URL with the difference of MEDIA_ROOT and the
        # uploaded resource's full path and filename appended.
        settings.CKEDITOR_UPLOAD_PREFIX = None
        no_prefix_url = '/media/uploads/arbitrary/path/and/filename.ext'
        self.failUnless(views.get_media_url(self.test_path) == no_prefix_url)

        # Resulting URL should never include '//'.
        self.failIf('//' in views.get_media_url(self.test_path))

    def test_get_thumb_filename(self):
        # Thumnbnail filename is the same as original
        # with _thumb inserted before the extension.
        self.failUnless(views.get_thumb_filename(self.test_path) == \
                self.test_path.replace('.ext', '_thumb.ext'))
        # Without an extension thumnbnail filename is the same as original
        # with _thumb appened.
        no_ext_path = self.test_path.replace('.ext', '')
        self.failUnless(views.get_thumb_filename(no_ext_path) == \
                no_ext_path + '_thumb')

    def test_get_image_browse_urls(self):
        settings.MEDIA_ROOT = os.path.join(os.path.dirname(__file__), 'media')
        settings.CKEDITOR_UPLOAD_PATH = os.path.join(settings.MEDIA_ROOT, \
                'test_uploads')
        #settings.CKEDITOR_RESTRICT_BY_USER = True

        # The test_uploads path contains subfolders, we should eventually reach
        # a single dummy resource.
        self.failUnless(views.get_image_browse_urls())

        # Ignore thumbnails.
        self.failUnless(len(views.get_image_browse_urls()) == 1)

        # Don't limit browse to user specific path if CKEDITOR_RESTRICT_BY_USER
        # is False.
        settings.CKEDITOR_RESTRICT_BY_USER = False
        self.failUnless(len(views.get_image_browse_urls(self.mock_user)) == 1)

        # Don't limit browse to user specific path if CKEDITOR_RESTRICT_BY_USER
        # is True but user is a superuser.
        settings.CKEDITOR_RESTRICT_BY_USER = True
        self.mock_user.is_superuser = True
        self.failUnless(len(views.get_image_browse_urls(self.mock_user)) == 1)

        # Limit browse to user specific path if CKEDITOR_RESTRICT_BY_USER is
        # True and user is not a superuser.
        settings.CKEDITOR_RESTRICT_BY_USER = True
        self.mock_user.is_superuser = False
        self.failIf(views.get_image_browse_urls(self.mock_user))

        settings.CKEDITOR_RESTRICT_BY_USER = \
                self.orig_CKEDITOR_RESTRICT_BY_USER

    def test_get_upload_filename(self):
        settings.CKEDITOR_UPLOAD_PATH = self.orig_CKEDITOR_UPLOAD_PATH
        date_path = datetime.now().strftime('%Y/%m/%d')

        # Don't upload to user specific path if CKEDITOR_RESTRICT_BY_USER
        # is False.
        settings.CKEDITOR_RESTRICT_BY_USER = False
        filename = views.get_upload_filename('test.jpg', self.mock_user)
        self.failIf(filename.replace('/%s/test.jpg' % date_path, '').\
                endswith(self.mock_user.username))

        # Upload to user specific path if CKEDITOR_RESTRICT_BY_USER is True.
        settings.CKEDITOR_RESTRICT_BY_USER = True
        filename = views.get_upload_filename('test.jpg', self.mock_user)
        self.failUnless(filename.replace('/%s/test.jpg' % date_path, '').\
                endswith(self.mock_user.username))

        # Upload path should end in current date structure.
        filename = views.get_upload_filename('test.jpg', self.mock_user)
        self.failUnless(filename.replace('/test.jpg', '').endswith(date_path))

        settings.CKEDITOR_RESTRICT_BY_USER = \
                self.orig_CKEDITOR_RESTRICT_BY_USER
