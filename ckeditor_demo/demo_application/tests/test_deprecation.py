import os
import warnings

from django.contrib.auth.models import User
from django.test import RequestFactory, SimpleTestCase, TestCase
from django.test.utils import override_settings

from ckeditor_uploader import backends
from ckeditor_uploader.views import get_upload_filename

from .utils import get_absolute_name

MOCK_FILENAME = "some_filename.jpg"
GENERATOR_PREFIX = "some_folder"
GENERATED_MOCK_FILENAME = os.path.join(GENERATOR_PREFIX, MOCK_FILENAME)


def generator_with_filename_and_request(filename, _request):
    return os.path.join(GENERATOR_PREFIX, filename)


def generator_with_only_filename(filename):
    return os.path.join(GENERATOR_PREFIX, filename)


def generator_without_parameters():
    return GENERATOR_PREFIX


class TestUploadFilenameGeneratorParameters(TestCase):
    fixtures = ["test_admin.json"]

    def setUp(self):
        self.mock_request = RequestFactory().request()
        self.mock_request.user = User.objects.get(username="test")

    @override_settings(
        CKEDITOR_FILENAME_GENERATOR=get_absolute_name(
            generator_with_filename_and_request
        )
    )
    def test_compatible_parameters(self):
        # `self.assertWarns()` is not available in Python 2
        with warnings.catch_warnings(record=True) as w:
            warnings.simplefilter("always")

            generated_filename = get_upload_filename(MOCK_FILENAME, self.mock_request)
            self.assertEqual(len(w), 0)

        self.assertIn(GENERATED_MOCK_FILENAME, generated_filename)

    @override_settings(
        CKEDITOR_FILENAME_GENERATOR=get_absolute_name(generator_with_only_filename)
    )
    def test_no_request_parameter_deprecation_warning(self):
        with warnings.catch_warnings(record=True) as w:
            warnings.simplefilter("always")

            generated_filename = get_upload_filename(MOCK_FILENAME, self.mock_request)
            self.assertEqual(len(w), 1)
            self.assertTrue(issubclass(w[0].category, PendingDeprecationWarning))

        self.assertIn(GENERATED_MOCK_FILENAME, generated_filename)

    @override_settings(
        CKEDITOR_FILENAME_GENERATOR=get_absolute_name(generator_without_parameters)
    )
    def test_incompatible_parameters(self):
        with warnings.catch_warnings(record=True) as w:
            warnings.simplefilter("always")

            generated_filename = get_upload_filename(MOCK_FILENAME, self.mock_request)
            self.assertEqual(len(w), 1)

        self.assertIn(MOCK_FILENAME, generated_filename)
        self.assertNotIn(GENERATOR_PREFIX, generated_filename)


class TestDeprecatedImageBackendValues(SimpleTestCase):
    @override_settings(CKEDITOR_IMAGE_BACKEND="pillow")
    def test_pillow_setting(self):
        with warnings.catch_warnings(record=True) as w:
            warnings.simplefilter("always")
            result = backends.get_backend()
            self.assertEqual(len(w), 1)
            self.assertEqual(result, backends.PillowBackend)

    @override_settings(CKEDITOR_IMAGE_BACKEND=None)
    def test_none_setting(self):
        with warnings.catch_warnings(record=True) as w:
            warnings.simplefilter("always")
            result = backends.get_backend()
            self.assertEqual(len(w), 1)
            self.assertEqual(result, backends.DummyBackend)
