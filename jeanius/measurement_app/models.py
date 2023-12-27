# measurement_app/models.py

from django.db import models

class Measurement(models.Model):
    width = models.FloatField()
    height = models.FloatField()
    distance = models.FloatField()
