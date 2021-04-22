from curlylint.lint import lint_one
from curlylint.report import Report
from pathlib import Path
from io import StringIO
import re
import json
import sys
from django.http import JsonResponse

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

    return JsonResponse({
        "issues": output
    })
