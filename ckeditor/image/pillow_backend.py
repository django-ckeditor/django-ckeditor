from io import BytesIO

from django.core.files.storage import default_storage

try:
    from PIL import Image, ImageOps
except ImportError:
    import Image
    import ImageOps

THUMBNAIL_SIZE = (75, 75)


def create_thumbnail(file_object, format):
    image = Image.open(file_object)

    # Convert to RGB if necessary
    # Thanks to Limodou on DjangoSnippets.org
    # http://www.djangosnippets.org/snippets/20/
    if image.mode not in ('L', 'RGB'):
        image = image.convert('RGB')

    # scale and crop to thumbnail
    imagefit = ImageOps.fit(image, THUMBNAIL_SIZE, Image.ANTIALIAS)
    thumbnail_io = BytesIO()
    imagefit.save(thumbnail_io, format=format)
    return thumbnail_io


def is_image(filepath):
    image = default_storage.open(filepath)
    try:
        Image.open(image)
    except IOError:
        return False
    else:
        return True
