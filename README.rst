Django CKEditor:
================
**Django admin CKEditor integration.**

Instalation:
------------

Usage:
------

Field:
~~~~~~
The quickest way to add rich text capabilities to your models is to use the included `HTMLField` model field type. A CKEditor widget is rendered as the form field::

    from django.db import models
    from ckeditor.fields import RichTextField

    class Post(models.Model):
        content = RichTextField()


Widget:
~~~~~~~
Alernatively you can use the included CKEditorWidget as the widget for a formfield::



Future Goals:
-------------
To create a pluggable rich text editing capability for Django admin.

Some resources that might aid development:
    #. http://blog.tommed.co.uk/2009/09/07/how-to-create-a-ckeditor-v3-plugin
    #. http://ajithmanmadhan.wordpress.com/2009/12/16/customizing-ckeditor-and-adding-a-new-toolbar-button/
    #. http://docs.cksource.com/ckeditor_api/
