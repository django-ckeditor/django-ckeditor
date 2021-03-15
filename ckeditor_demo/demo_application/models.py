from django.db import models

from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import RichTextUploadingField


class ExampleModel(models.Model):
    content = RichTextUploadingField()


class ExampleNonUploadModel(models.Model):
    content = RichTextField()
