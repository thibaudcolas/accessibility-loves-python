import os

from pathlib import Path

env = os.environ.copy()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
if "SECRET_KEY" in env:
    SECRET_KEY = env["SECRET_KEY"]

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.get("DEBUG", "true") == "true"

if "VERCEL_URL" in env and ("localhost" not in env["VERCEL_URL"]):
    ALLOWED_HOSTS = [
        env["VERCEL_URL"],
        "accessibility-loves-python.vercel.app",
    ]
else:
    ALLOWED_HOSTS = ["localhost", "accessibility-loves-python.vercel.app"]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.middleware.common.CommonMiddleware",
]

ROOT_URLCONF = "api.urls"

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True
