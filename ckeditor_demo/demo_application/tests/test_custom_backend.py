from django import test

from ckeditor_uploader import backends


class CustomBackend:
    pass


class TestSelectingCustomBackend(test.SimpleTestCase):
    @test.override_settings(
        CKEDITOR_IMAGE_BACKEND="ckeditor_demo.demo_application.tests.test_custom_backend.CustomBackend"
    )
    def test_setting_returns_custom_backend(self):
        result = backends.get_backend()
        self.assertEqual(result, CustomBackend)
