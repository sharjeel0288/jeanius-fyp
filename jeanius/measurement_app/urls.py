# measurement_app/urls.py
from django.urls import path
from .views import measurement_view, color_match


urlpatterns = [
    path('measurements/', measurement_view, name='measurements'),

    path('color-match/', color_match, name='color-match'),
]
