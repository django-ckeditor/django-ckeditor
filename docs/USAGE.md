# Usage Guide 

## Field

The quickest way to add rich text editing capabilities to your models is to use the included ``RichTextField`` model field type. A CKEditor widget is rendered as the form field but in all other regards the field behaves as the standard Django ``TextField``. For example::

    from django.db import models
    from ckeditor.fields import RichTextField

    class Post(models.Model):
        content = RichTextField()


## Widget

Alernatively you can use the included ``CKEditorWidget`` as the widget for a formfield. For example::

    from django import forms
    from django.contrib import admin
    from ckeditor.widgets import CKEditorWidget

    from post.models import Post

    class PostAdminForm(forms.ModelForm):
        content = forms.CharField(widget=CKEditorWidget())
        class Meta:
            model = Post

    class PostAdmin(admin.ModelAdmin):
        form = PostAdminForm

    admin.site.register(Post, PostAdmin)


Note that when using outside of admin panel you will have to make sure all form media is present for the editor to work. You may have to render the media like so::

    <form>
        {{ myform.media }}
        {{ myform.as_p }}
        <input type="submit"/>
    </form>



## Management Commands

Included is a management command to create thumbnails for images already contained in ``CKEDITOR_UPLOAD_PATH``. This is useful to create thumbnails when starting to use django-ckeditor with existing images. Issue the command as follows::

    $ ./manage.py generateckeditorthumbnails

**NOTE**: If you're using custom views remember to include ckeditor.js in your form's media either through ``{{ form.media }}`` or through a ``<script>`` tag. Admin will do this for you automatically. See `Django's Form Media docs <http://docs.djangoproject.com/en/dev/topics/forms/media/>`_ for more info.

## Using S3

See http://django-storages.readthedocs.org/en/latest/


## If you want to use allowedContent

To allowedContent works, disable **stylesheetparser** plugin.
So included this on your settings.py.::

    CKEDITOR_CONFIGS = {
        "default": {
            "removePlugins": "stylesheetparser",
        }
    }


## Demo / Test application

If you clone the repository you will be able to run the ``ckeditor_demo`` application.

1. ``pip install -r ckeditor_demo_requirements.txt``

2. Run ``python.manage.py syncdb``

3. Create a superuser if you want to test the widget in the admin panel

4. Start the development server.

There is a forms.Form on main page (/) and a model in admin that uses the widget for a model field.
Database is set to sqlite3 and STATIC/MEDIA_ROOT to folders in temporary directory.


### Running selenium test

You can run the test with ``python manage.py test ckeditor_demo`` (for repo checkout only) or with ``tox`` which is configured to run with Python 2.7 and 3.3.
(You may have to fix some imports in selenium webdriver for Python 3.3).


## Versioning

First two numbers resemble ckeditor version used in the package. The third is used to issue releases for given ckeditor bundle (fixes, new features)
