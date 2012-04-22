from django.db import models
from ckeditor.fields import RichTextField


class Post(models.Model):
    content_basic = RichTextField('Basic', config_name='basic')
    content_full = RichTextField('Full', config_name='full')
    content_custom = RichTextField(config_name='custom', verbose_name='Custom')
