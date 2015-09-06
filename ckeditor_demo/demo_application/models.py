from __future__ import absolute_import

from django.db import models

from ckeditor_uploader.fields import RichTextUploadingField
from ckeditor.fields import RichTextField


class ExampleModel(models.Model):
    content = RichTextUploadingField()


class ExampleNonUploadModel(models.Model):
    content = RichTextField()
