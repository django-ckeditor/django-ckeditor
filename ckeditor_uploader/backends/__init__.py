import warnings

from django.conf import settings
from django.utils.module_loading import import_string

from .dummy_backend import DummyBackend


__all__ = ["get_backend", "DummyBackend", "PillowBackend"]


try:
    from .pillow_backend import PillowBackend
except ImportError:
    pass


# Allow for a custom image backend defined in settings.
def get_backend():
    backend_path = getattr(
        settings, "CKEDITOR_IMAGE_BACKEND", "ckeditor_uploader.backends.DummyBackend"
    )

    # Honour old registry keys while emitting warnings
    if backend_path is None:
        backend_path = "ckeditor_uploader.backends.DummyBackend"
        warnings.warn(
            "CKEDITOR_IMAGE_BACKEND now uses a fully qualified path to the backend class."
            "  None should be changed to 'ckeditor_uploader.backends.DummyBackend'",
            PendingDeprecationWarning,
            stacklevel=2,
        )
    elif backend_path == "pillow":
        backend_path = "ckeditor_uploader.backends.PillowBackend"
        warnings.warn(
            "CKEDITOR_IMAGE_BACKEND now uses a fully qualified path to the backend class."
            "  'pillow' should be changed to 'ckeditor_uploader.backends.PillowBackend'",
            PendingDeprecationWarning,
            stacklevel=2,
        )

    return import_string(backend_path)
