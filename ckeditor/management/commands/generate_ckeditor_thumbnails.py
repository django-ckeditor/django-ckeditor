"""
Creates thumbnail files for the CKEditor file image browser. Useful if starting
to use django-ckeditor with existing images.
"""

import os

from django.core.management.base import NoArgsCommand

from ckeditor.views import (get_image_files, get_thumb_filename,
                            create_thumbnail)


class Command(NoArgsCommand):
    def handle_noargs(self, **options):
        for image in get_image_files():
            if not os.path.isfile(get_thumb_filename(image)):
                print "Creating thumbnail for %s" % image
                try:
                    create_thumbnail(image)
                except Exception, e:
                    print "Couldn't create thumbnail for %s: %s" % (image, e)
        print "Finished"
