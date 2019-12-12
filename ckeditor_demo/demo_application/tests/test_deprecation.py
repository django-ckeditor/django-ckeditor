import warnings

from django.contrib.auth.models import User
from django.http.request import HttpRequest
from django.test import TestCase
from django.test.utils import override_settings

from ckeditor_uploader.views import get_upload_filename
from .utils import get_absolute_name

MOCK_FILENAME = 'some_filename.jpg'
mock_request = HttpRequest()


def generator_with_filename_and_request(filename, request):
    assert filename == MOCK_FILENAME
    assert request is mock_request
    assert hasattr(request, 'user')
    return filename


def generator_with_only_filename(filename):
    assert filename == MOCK_FILENAME
    return filename


def generator_without_parameters():
    pass


class TestUploadFilenameGeneratorParameters(TestCase):
    fixtures = ['test_admin.json']

    def setUp(self):
        mock_request.user = User.objects.get(pk=1)

    @override_settings(CKEDITOR_FILENAME_GENERATOR=get_absolute_name(generator_with_filename_and_request))
    def test_compatible_parameters(self):
        # `self.assertWarns()` is not available in Python 2
        with warnings.catch_warnings(record=True) as w:
            warnings.simplefilter("always")

            get_upload_filename(MOCK_FILENAME, mock_request)
            assert len(w) == 0

    @override_settings(CKEDITOR_FILENAME_GENERATOR=get_absolute_name(generator_with_only_filename))
    def test_no_request_parameter_deprecation_warning(self):
        with warnings.catch_warnings(record=True) as w:
            warnings.simplefilter("always")

            get_upload_filename(MOCK_FILENAME, mock_request)
            assert len(w) == 1
            assert issubclass(w[0].category, PendingDeprecationWarning)

    @override_settings(CKEDITOR_FILENAME_GENERATOR=get_absolute_name(generator_without_parameters))
    def test_incompatible_parameters(self):
        with warnings.catch_warnings(record=True) as w:
            warnings.simplefilter("always")

            get_upload_filename(MOCK_FILENAME, mock_request)
            assert len(w) == 1
