import re
import json
import sys
from io import StringIO
from pathlib import Path
from typing import Sequence
from curlylint.lint import lint_one
from django.http import HttpResponse, JsonResponse
from willow.image import Image
from willow.plugins.pillow import PillowImage
from willow.registry import registry

# https://github.com/wenmin-wu/dominant-colors-py
from dominantcolors import rgba2rgb, find_dominant_colors
import numpy as np


def to_hex(rgb_tuple: Sequence[int]):
    return "#%02x%02x%02x" % tuple(rgb_tuple)


def get_dominant_colors_for(image, num_colors):
    """Get dominant colors from a given pillow Image instance"""
    im_arr = np.asarray(image)
    if image.mode == "RGBA":
        im_arr = rgba2rgb(im_arr)
    return find_dominant_colors(im_arr, num_colors)


def pillow_dominant(image):
    dominant_colors = get_dominant_colors_for(
        image.get_pillow_image(), num_colors=1
    )
    return dominant_colors


registry.register_operation(PillowImage, "dominant", pillow_dominant)


async def index(request):
    return HttpResponse("Hello, async Django!")


async def upload_file(request):
    if request.method == "POST":
        i = Image.open(request.FILES["image"])
        colors = i.dominant()
        return JsonResponse(
            {
                "colors": colors,
            }
        )

    return JsonResponse(
        {
            "message": "use POST instead",
        }
    )


async def lint(request):
    if not request.method == "POST":
        return JsonResponse(
            {
                "message": "use POST instead",
            }
        )

    output = []

    data = json.loads(request.body)
    template_source = data.get("template_source", "")
    if template_source:
        rules = {}
        if data.get("aria_role", False):
            rules["aria_role"] = True
        if data.get("django_forms_rendering", False):
            rules["django_forms_rendering"] = True
        if data.get("html_has_lang", False):
            rules["html_has_lang"] = True
        if data.get("image_alt", False):
            rules["image_alt"] = True
        if data.get("meta_viewport", False):
            rules["meta_viewport"] = True
        if data.get("no_autofocus", False):
            rules["no_autofocus"] = True
        if data.get("tabindex_no_positive", False):
            rules["tabindex_no_positive"] = True

        sys.stdin = StringIO(template_source)
        issues = lint_one(
            Path("-"),
            {
                "parse_only": data.get("parse_only", False),
                "template_tags": data.get("template_tags", []),
                "rules": rules,
            },
        )
        sys.stdin = sys.__stdin__

        for issue in issues:
            output.append(
                {
                    "line": issue.location.line,
                    "column": issue.location.column,
                    "message": issue.message,
                    "code": issue.code,
                }
            )

    return JsonResponse({"issues": output})
