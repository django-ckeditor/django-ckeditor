from __future__ import absolute_import

from django.db import models

from ckeditor.fields import RichTextField


class ExampleModel(models.Model):
    content = RichTextField()
