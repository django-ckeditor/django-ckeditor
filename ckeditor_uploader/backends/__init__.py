from django.conf import settings

from .dummy_backend import DummyBackend


class BackendRegistry:
    def __init__(self):
        self._registry = {}

    def register(self, backend_id, backend):
        if backend_id in self._registry:
            raise KeyError("%s is already a registered" % backend_id)
        self._registry[backend_id] = backend

    def get_backend(self):
        backend_id = getattr(settings, "CKEDITOR_IMAGE_BACKEND", None)
        if backend_id is None:
            return DummyBackend
        return self._registry[backend_id]


registry = BackendRegistry()


try:
    from .pillow_backend import PillowBackend

    registry.register("pillow", PillowBackend)
except ImportError:
    pass
