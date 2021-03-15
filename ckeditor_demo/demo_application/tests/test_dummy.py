import json
import os.path

from django.contrib.staticfiles.finders import find
from django.test import TestCase
from django.test.utils import override_settings
from django.urls import reverse

from .utils import get_absolute_media_path, get_media_url, remove_upload_directory, sha1


@override_settings(CKEDITOR_IMAGE_BACKEND=None)
class DummyTestCase(TestCase):
    fixtures = ["test_admin.json"]

    def setUp(self):
        remove_upload_directory()

    def assertJsonResponse(self, response, expected_data):
        self.assertEqual(200, response.status_code)
        data = json.loads(response.content)
        self.assertEqual(data, expected_data)

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
        self.assertEqual(sha1(filepath), sha1(upload))

    @override_settings(CKEDITOR_ALLOW_NONIMAGE_FILES=False)
    def test_upload_file_disabled(self):
        self.client.login(username="test", password="test")

        filepath = find("ckeditor/ckeditor/LICENSE.md")

        with open(filepath, "rb") as fp:
            response = self.client.post(reverse("ckeditor_upload"), {"upload": fp})
        self.assertEqual(200, response.status_code)
        self.assertContains(response, "Invalid file type.")

    @override_settings(CKEDITOR_ALLOW_NONIMAGE_FILES=False)
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
        self.assertTrue(os.path.isfile(upload), upload)
        self.assertEqual(sha1(filepath), sha1(upload))

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
        self.assertTrue(os.path.isfile(upload), upload)
        self.assertEqual(sha1(filepath), sha1(upload))

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
        self.assertTrue(os.path.isfile(upload), upload)
        self.assertEqual(sha1(filepath), sha1(upload))
