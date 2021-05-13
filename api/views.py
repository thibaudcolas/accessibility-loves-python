import re
import json
import sys
from io import StringIO
from pathlib import Path
from typing import Dict
from curlylint.lint import lint_one
from kontrasto import wcag_2, wcag_3
from kontrasto.willow_operations import pillow_dominant
from django.http import HttpResponse, JsonResponse
from willow.image import Image
from willow.plugins.pillow import PillowImage
from willow.registry import registry

registry.register_operation(PillowImage, "dominant", pillow_dominant)


def wcag_2_contrast_light_or_dark(
    image, light_color: str, dark_color: str
) -> Dict[str, str]:
    dominant = image.dominant()
    light_contrast = wcag_2.wcag2_contrast(dominant, light_color)
    dark_contrast = wcag_2.wcag2_contrast(dominant, dark_color)
    lighter = light_contrast > dark_contrast
    return {
        "text_color": light_color if lighter else dark_color,
        "text_theme": "light" if lighter else "dark",
        "bg_color": dominant,
        "bg_theme": "dark" if lighter else "light",
    }


def wcag_3_contrast_light_or_dark(
    image, light_color: str, dark_color: str
) -> Dict[str, str]:
    dominant = image.dominant()
    light_contrast = wcag_3.format_contrast(
        wcag_3.apca_contrast(dominant, light_color)
    )
    dark_contrast = wcag_3.format_contrast(
        wcag_3.apca_contrast(dominant, dark_color)
    )
    lighter = light_contrast > dark_contrast
    return {
        "text_color": light_color if lighter else dark_color,
        "text_theme": "light" if lighter else "dark",
        "bg_color": dominant,
        "bg_theme": "dark" if lighter else "light",
    }


async def index(request):
    return HttpResponse("Hello, async Django!")


async def upload_file(request):
    if request.method == "POST":
        i = Image.open(request.FILES["image"])
        return JsonResponse(
            {
                "wcag2": wcag_2_contrast_light_or_dark(i, "#ffffff", "#000000"),
                "wcag3": wcag_3_contrast_light_or_dark(i, "#ffffff", "#000000"),
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
