import os

from ckeditor.views import create_thumbnail, get_image_files, \
        get_thumb_filename
from django.core.management.base import NoArgsCommand


class Command(NoArgsCommand):
    """
    Creates thumbnail files for the CKEditor file image browser.
    Useful if starting to use django-ckeditor with existing images.
    """
    def handle_noargs(self, **options):
        for image in get_image_files():
            if not os.path.isfile(get_thumb_filename(image)):
                self.stdout.write("Creating thumbnail for {0}".format(image))
                try:
                    create_thumbnail(image)
                except Exception as e:
                    self.stdout.write("Couldn't create thumbnail for {0}: {1}".format(image, e))
        self.stdout.write("Finished")
