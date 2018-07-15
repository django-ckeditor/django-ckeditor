from __future__ import absolute_import

import os
from datetime import datetime

from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.utils.html import escape
from django.utils.module_loading import import_string
from django.views import generic
from django.views.decorators.csrf import csrf_exempt

from PIL import Image

from ckeditor_uploader import image_processing, utils
from ckeditor_uploader.utils import storage
from ckeditor_uploader.forms import SearchForm


def _get_user_path(user):
    user_path = ''

    # If CKEDITOR_RESTRICT_BY_USER is True upload file to user specific path.
    RESTRICT_BY_USER = getattr(settings, 'CKEDITOR_RESTRICT_BY_USER', False)
    if RESTRICT_BY_USER:
        try:
            user_prop = getattr(user, RESTRICT_BY_USER)
        except (AttributeError, TypeError):
            user_prop = getattr(user, 'get_username')

        if callable(user_prop):
            user_path = user_prop()
        else:
            user_path = user_prop

    return str(user_path)


def get_upload_filename(upload_name, user):

    user_path = _get_user_path(user)

    # Generate date based path to put uploaded file.
    # If CKEDITOR_RESTRICT_BY_DATE is True upload file to date specific path.
    if getattr(settings, 'CKEDITOR_RESTRICT_BY_DATE', True):
        date_path = datetime.now().strftime('%Y/%m/%d')
    else:
        date_path = ''

    # Complete upload path (upload_path + date_path).
    upload_path = os.path.join(
        settings.CKEDITOR_UPLOAD_PATH, user_path, date_path
    )

    if (getattr(settings, 'CKEDITOR_UPLOAD_SLUGIFY_FILENAME', True) and
            not hasattr(settings, 'CKEDITOR_FILENAME_GENERATOR')):
        upload_name = utils.slugify_filename(upload_name)

    if hasattr(settings, 'CKEDITOR_FILENAME_GENERATOR'):
        generator = import_string(settings.CKEDITOR_FILENAME_GENERATOR)
        upload_name = generator(upload_name)

    return storage.get_available_name(
        os.path.join(upload_path, upload_name)
    )


class ImageUploadView(generic.View):
    http_method_names = ['post']

    def post(self, request, **kwargs):
        """
        Uploads a file and send back its URL to CKEditor.
        """
        uploaded_file = request.FILES['upload']

        backend = image_processing.get_backend()

        ck_func_num = request.GET.get('CKEditorFuncNum')
        if ck_func_num:
            ck_func_num = escape(ck_func_num)

        # Throws an error when an non-image file are uploaded.
        if not getattr(settings, 'CKEDITOR_ALLOW_NONIMAGE_FILES', True):
            try:
                backend.image_verify(uploaded_file)
            except utils.NotAnImageException:
                return HttpResponse("""
                    <script type='text/javascript'>
                    window.parent.CKEDITOR.tools.callFunction({0}, '', 'Invalid file type.');
                    </script>""".format(ck_func_num))

        saved_path = self._save_file(request, uploaded_file)
        if(str(saved_path).split('.')[1].lower() != 'gif'):
            self._create_thumbnail_if_needed(backend, saved_path)
        url = utils.get_media_url(saved_path)

        if ck_func_num:
            # Respond with Javascript sending ckeditor upload url.
            return HttpResponse("""
            <script type='text/javascript'>
                window.parent.CKEDITOR.tools.callFunction({0}, '{1}');
            </script>""".format(ck_func_num, url))
        else:
            retdata = {'url': url, 'uploaded': '1',
                       'fileName': uploaded_file.name}
            return JsonResponse(retdata)

    @staticmethod
    def _save_file(request, uploaded_file):
        filename = get_upload_filename(uploaded_file.name, request.user)

        img_name, img_format = os.path.splitext(filename)
        IMAGE_QUALITY = getattr(settings, "IMAGE_QUALITY", 60)

        if(str(img_format).lower() == "png"):

            img = Image.open(uploaded_file)
            img = img.resize(img.size, Image.ANTIALIAS)
            saved_path = storage.save("{}.jpg".format(img_name), uploaded_file)
            img.save("{}.jpg".format(img_name), quality=IMAGE_QUALITY, optimize=True)

        elif(str(img_format).lower() == "jpg" or str(img_format).lower() == "jpeg"):

            img = Image.open(uploaded_file)
            img = img.resize(img.size, Image.ANTIALIAS)
            saved_path = storage.save(filename, uploaded_file)
            img.save(saved_path, quality=IMAGE_QUALITY, optimize=True)

        else:
            saved_path = storage.save(filename, uploaded_file)

        return saved_path

    @staticmethod
    def _create_thumbnail_if_needed(backend, saved_path):
        if backend.should_create_thumbnail(saved_path):
            backend.create_thumbnail(saved_path)


upload = csrf_exempt(ImageUploadView.as_view())


def get_image_files(user=None, path=''):
    """
    Recursively walks all dirs under upload dir and generates a list of
    full paths for each file found.
    """
    # If a user is provided and CKEDITOR_RESTRICT_BY_USER is True,
    # limit images to user specific path, but not for superusers.
    STORAGE_DIRECTORIES = 0
    STORAGE_FILES = 1

    # allow browsing from anywhere if user is superuser
    # otherwise use the user path
    if user and not user.is_superuser:
        user_path = _get_user_path(user)
    else:
        user_path = ''

    browse_path = os.path.join(settings.CKEDITOR_UPLOAD_PATH, user_path, path)

    try:
        storage_list = storage.listdir(browse_path)
    except NotImplementedError:
        return
    except OSError:
        return

    for filename in storage_list[STORAGE_FILES]:
        if os.path.splitext(filename)[0].endswith('_thumb') or os.path.basename(filename).startswith('.'):
            continue
        filename = os.path.join(browse_path, filename)
        yield filename

    for directory in storage_list[STORAGE_DIRECTORIES]:
        if directory.startswith('.'):
            continue
        directory_path = os.path.join(path, directory)
        for element in get_image_files(user=user, path=directory_path):
            yield element


def get_files_browse_urls(user=None):
    """
    Recursively walks all dirs under upload dir and generates a list of
    thumbnail and full image URL's for each file found.
    """
    files = []
    for filename in get_image_files(user=user):
        src = utils.get_media_url(filename)
        if getattr(settings, 'CKEDITOR_IMAGE_BACKEND', None):
            if is_image(src):
                thumb = utils.get_media_url(utils.get_thumb_filename(filename))
            else:
                thumb = utils.get_icon_filename(filename)
            visible_filename = os.path.split(filename)[1]
            if len(visible_filename) > 20:
                visible_filename = visible_filename[0:19] + '...'
        else:
            thumb = src
            visible_filename = os.path.split(filename)[1]
        files.append({
            'thumb': thumb,
            'src': src,
            'is_image': is_image(src),
            'visible_filename': visible_filename,
        })

    return files


def is_image(path):
    ext = path.split('.')[-1].lower()
    return ext in ['jpg', 'jpeg', 'png', 'gif']


def browse(request):
    files = get_files_browse_urls(request.user)
    if request.method == 'POST':
        form = SearchForm(request.POST)
        if form.is_valid():
            query = form.cleaned_data.get('q', '').lower()
            files = list(filter(lambda d: query in d[
                         'visible_filename'].lower(), files))
    else:
        form = SearchForm()

    show_dirs = getattr(settings, 'CKEDITOR_BROWSE_SHOW_DIRS', False)
    dir_list = sorted(set(os.path.dirname(f['src'])
                          for f in files), reverse=True)

    # Ensures there are no objects created from Thumbs.db files - ran across
    # this problem while developing on Windows
    if os.name == 'nt':
        files = [f for f in files if os.path.basename(f['src']) != 'Thumbs.db']

    context = {
        'show_dirs': show_dirs,
        'dirs': dir_list,
        'files': files,
        'form': form
    }
    return render(request, 'ckeditor/browse.html', context)
