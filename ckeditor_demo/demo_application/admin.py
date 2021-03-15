from django.contrib import admin

from . import models

admin.site.register(models.ExampleModel)
admin.site.register(models.ExampleNonUploadModel)
