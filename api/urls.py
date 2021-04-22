from django.urls import path

from api.views import lint, upload_file

urlpatterns = [
    path("api/contrast", upload_file),
    path("api/lint", lint),
]
