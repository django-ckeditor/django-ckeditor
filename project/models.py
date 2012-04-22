from django.db import models
from ckeditor.fields import RichTextField


class Post(models.Model):
    content_basic = RichTextField(config_name='basic')
    content_full = RichTextField(config_name='full')
    content_custom = RichTextField(config_name='custom')
