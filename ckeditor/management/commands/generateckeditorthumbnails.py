import os

from django.conf import settings
from django.core.management.base import NoArgsCommand

from ckeditor.views import get_image_files
from ckeditor.utils import get_thumb_filename
from ckeditor.image_processing import get_backend


class Command(NoArgsCommand):
    """
    Creates thumbnail files for the CKEditor file image browser.
    Useful if starting to use django-ckeditor with existing images.
    """
    def handle_noargs(self, **options):
        if getattr(settings, 'CKEDITOR_IMAGE_BACKEND', None):
            backend = get_backend()
            for image in get_image_files():
                if not os.path.isfile(get_thumb_filename(image)):
                    self.stdout.write("Creating thumbnail for {0}".format(image))
                    try:
                        backend.create_thumbnail(image)
                    except Exception as e:
                        self.stdout.write("Couldn't create thumbnail for {0}: {1}".format(image, e))
            self.stdout.write("Finished")
        else:
            self.stdout.write("No thumbnail backend is enabled")
