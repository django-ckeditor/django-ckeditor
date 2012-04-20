from django.db import models
from ckeditor.fields import RichTextField

class Post(models.Model):
    content = RichTextField()
