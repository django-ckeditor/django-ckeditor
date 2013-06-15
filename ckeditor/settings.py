from django.conf import settings


"""
This new settings variable allows you to enable (or not) the user to browse the
images he has uploaded to the server. If it's set to False, no thumbs are created
for the images.
When setting this variable to False you have to remove the `browse` button
from all the ckeditor dialogs where it appears through the config.js file.
"""
CKEDITOR_BROWSEABLE_UPLOADED_IMAGES = getattr(
    settings, 'CKEDITOR_BROWSEABLE_UPLOADED_IMAGES', False)
