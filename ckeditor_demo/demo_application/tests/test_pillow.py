from __future__ import absolute_import, unicode_literals

import json
import os.path

from django.contrib.staticfiles.finders import find
from django.test import TestCase
from django.test.utils import override_settings
from django.urls import reverse

from .utils import get_absolute_media_path, get_media_url, remove_upload_directory, sha1


class PillowTestCase(TestCase):
    fixtures = ["test_admin.json"]

    def setUp(self):
        remove_upload_directory()

    def assertJsonResponse(self, response, expected_data):
        self.assertEqual(200, response.status_code)
        data = json.loads(response.content)
        self.assertEqual(data, expected_data)

    @override_settings(CKEDITOR_ALLOW_NONIMAGE_FILES=False)
    def test_upload_file_disabled(self):
        self.client.login(username="test", password="test")

        filepath = find("ckeditor/ckeditor/LICENSE.md")

        with open(filepath, "rb") as fp:
            response = self.client.post(reverse("ckeditor_upload"), {"upload": fp})
        self.assertEqual(200, response.status_code)
        self.assertContains(response, "Invalid file type.")

    def test_upload_file(self):
        self.client.login(username="test", password="test")

        filepath = find("ckeditor/ckeditor/LICENSE.md")

        with open(filepath, "rb") as fp:
            response = self.client.post(reverse("ckeditor_upload"), {"upload": fp})
        self.assertJsonResponse(
            response,
            {
                "fileName": "license.md",
                "uploaded": "1",
                "url": get_media_url("license.md"),
            },
        )
        upload = get_absolute_media_path("license.md")
        self.assertTrue(os.path.isfile(upload), upload)
        self.assertEqual(os.path.getsize(filepath), os.path.getsize(upload))
        self.assertEqual(sha1(filepath), sha1(upload))

    @override_settings(CKEDITOR_FORCE_JPEG_COMPRESSION=True)
    def test_upload_file_with_compression_enabled(self):
        self.client.login(username="test", password="test")

        filepath = find("ckeditor/ckeditor/LICENSE.md")

        with open(filepath, "rb") as fp:
            response = self.client.post(reverse("ckeditor_upload"), {"upload": fp})
        self.assertJsonResponse(
            response,
            {
                "fileName": "license.md",
                "uploaded": "1",
                "url": get_media_url("license.md"),
            },
        )
        upload = get_absolute_media_path("license.md")
        self.assertTrue(os.path.isfile(upload), upload)
        self.assertEqual(os.path.getsize(filepath), os.path.getsize(upload))
        self.assertEqual(sha1(filepath), sha1(upload))

    @override_settings(CKEDITOR_FORCE_JPEG_COMPRESSION=False)
    def test_upload_jpg(self):
        self.client.login(username="test", password="test")

        filepath = find(
            "ckeditor/ckeditor/plugins/codesnippet/lib/highlight/styles/pojoaque.jpg"
        )

        with open(filepath, "rb") as fp:
            response = self.client.post(reverse("ckeditor_upload"), {"upload": fp})
        self.assertJsonResponse(
            response,
            {
                "fileName": "pojoaque.jpg",
                "uploaded": "1",
                "url": get_media_url("pojoaque.jpg"),
            },
        )
        upload = get_absolute_media_path("pojoaque.jpg")
        thumb = get_absolute_media_path("pojoaque_thumb.jpg")
        self.assertEqual(sha1(filepath), sha1(upload))
        self.assertEqual(1186, os.path.getsize(upload))
        self.assertEqual(1144, os.path.getsize(thumb))

    @override_settings(CKEDITOR_FORCE_JPEG_COMPRESSION=True)
    def test_upload_jpg_compression_enabled(self):
        self.client.login(username="test", password="test")

        filepath = find(
            "ckeditor/ckeditor/plugins/codesnippet/lib/highlight/styles/pojoaque.jpg"
        )

        with open(filepath, "rb") as fp:
            response = self.client.post(reverse("ckeditor_upload"), {"upload": fp})
        self.assertJsonResponse(
            response,
            {
                "fileName": "pojoaque.jpg",
                "uploaded": "1",
                "url": get_media_url("pojoaque.jpg"),
            },
        )
        upload = get_absolute_media_path("pojoaque.jpg")
        thumb = get_absolute_media_path("pojoaque_thumb.jpg")
        self.assertEqual(598, os.path.getsize(upload))
        self.assertEqual(637, os.path.getsize(thumb))

    @override_settings(CKEDITOR_FORCE_JPEG_COMPRESSION=False)
    def test_upload_png(self):
        self.client.login(username="test", password="test")

        filepath = find("ckeditor/ckeditor/skins/moono/images/hidpi/close.png")

        with open(filepath, "rb") as fp:
            response = self.client.post(reverse("ckeditor_upload"), {"upload": fp})
        self.assertJsonResponse(
            response,
            {
                "fileName": "close.png",
                "uploaded": "1",
                "url": get_media_url("close.png"),
            },
        )
        upload = get_absolute_media_path("close.png")
        thumb = get_absolute_media_path("close_thumb.png")
        self.assertEqual(sha1(filepath), sha1(upload))
        self.assertEqual(1271, os.path.getsize(upload))
        self.assertEqual(748, os.path.getsize(thumb))

    @override_settings(CKEDITOR_FORCE_JPEG_COMPRESSION=True)
    def test_upload_png_with_compression_enabled(self):
        self.client.login(username="test", password="test")

        filepath = find("ckeditor/ckeditor/skins/moono/images/hidpi/close.png")

        with open(filepath, "rb") as fp:
            response = self.client.post(reverse("ckeditor_upload"), {"upload": fp})
        self.assertJsonResponse(
            response,
            {
                "fileName": "close.jpg",
                "uploaded": "1",
                "url": get_media_url("close.jpg"),
            },
        )
        upload = get_absolute_media_path("close.jpg")
        thumb = get_absolute_media_path("close_thumb.jpg")
        self.assertTrue(os.path.isfile(upload), upload)
        self.assertTrue(os.path.isfile(thumb), thumb)
        self.assertEqual(575, os.path.getsize(upload))
        self.assertEqual(642, os.path.getsize(thumb))

    @override_settings(CKEDITOR_FORCE_JPEG_COMPRESSION=False)
    def test_upload_gif(self):
        self.client.login(username="test", password="test")

        filepath = find("ckeditor/galleriffic/css/loader.gif")

        with open(filepath, "rb") as fp:
            response = self.client.post(reverse("ckeditor_upload"), {"upload": fp})
        self.assertJsonResponse(
            response,
            {
                "fileName": "loader.gif",
                "uploaded": "1",
                "url": get_media_url("loader.gif"),
            },
        )
        upload = get_absolute_media_path("loader.gif")
        thumb = get_absolute_media_path("loader_thumb.gif")
        self.assertEqual(sha1(filepath), sha1(upload))
        self.assertEqual(10453, os.path.getsize(upload))
        self.assertFalse(os.path.exists(thumb), thumb)

    @override_settings(CKEDITOR_FORCE_JPEG_COMPRESSION=True)
    def test_upload_gif_with_compression_enabled(self):
        self.client.login(username="test", password="test")

        filepath = find("ckeditor/galleriffic/css/loader.gif")

        with open(filepath, "rb") as fp:
            response = self.client.post(reverse("ckeditor_upload"), {"upload": fp})
        self.assertJsonResponse(
            response,
            {
                "fileName": "loader.gif",
                "uploaded": "1",
                "url": get_media_url("loader.gif"),
            },
        )
        upload = get_absolute_media_path("loader.gif")
        thumb = get_absolute_media_path("loader_thumb.gif")
        self.assertEqual(sha1(filepath), sha1(upload))
        self.assertEqual(10453, os.path.getsize(upload))
        self.assertFalse(os.path.exists(thumb), thumb)
