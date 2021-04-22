import re
import json
import sys
from io import StringIO
from pathlib import Path
from curlylint.lint import lint_one
from curlylint.report import Report
from django.http import HttpResponse, JsonResponse
from willow.image import Image
from willow.plugins.pillow import PillowImage
from willow.registry import registry

# https://github.com/wenmin-wu/dominant-colors-py
from dominantcolors import rgba2rgb, find_dominant_colors
import numpy as np


def get_dominant_colors_for(image, num_colors):
    """Get dominant colors from a given pillow Image instance"""
    im_arr = np.asarray(image)
    if image.mode == "RGBA":
        im_arr = rgba2rgb(im_arr)
    return find_dominant_colors(im_arr, num_colors)


def pillow_dominant(image):
    dominant_colors = get_dominant_colors_for(
        image.get_pillow_image(), num_colors=3
    )
    return dominant_colors


registry.register_operation(PillowImage, "dominant", pillow_dominant)


async def index(request):
    return HttpResponse("Hello, async Django!")


async def upload_file(request):
    if request.method == "POST":
        i = Image.open(request.FILES["image"])
        colors = i.dominant()
        print(colors)
        return HttpResponse("test")
    else:
        return HttpResponse("test")


def lint(request):
    sys.stdin = StringIO("<p>{% of a %}c{% elseof %}b{% endof %}</p>")
    issues = lint_one(Path("-"), {})
    sys.stdin = sys.__stdin__

    sorted_issues = sorted(
        issues,
        key=lambda i: (
            i.location.file_path,
            i.location.line,
            i.location.column,
        ),
    )

    output = []

    for issue in sorted_issues:
        output.append(
            {
                "file_path": str(issue.location.file_path),
                "line": issue.location.line,
                "column": issue.location.column,
                "message": issue.message,
                "code": issue.code,
            }
        )

    return JsonResponse({"issues": output})
