from django.db import models

# Create your models here.


class Word(models.Model):
    polish_name = models.CharField(max_length=50)
    english_name = models.CharField(max_length=50)
    status = models.CharField(max_length=50)

    class Meta:
        app_label = 'mybackend'

    def __str__(self):
        return f"{self.polish_name} - {self.english_name}"