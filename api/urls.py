from django.urls import path

from api.views.contrast import upload_file
from api.views.lint import lint

urlpatterns = [
    path("api/contrast", upload_file),
    path("api/lint", lint),
]
