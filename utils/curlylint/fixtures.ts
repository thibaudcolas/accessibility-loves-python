const fixtures = {
  lang_missing: {
    label: "Lang attribute: missing",
    source: `<!DOCTYPE HTML>
<html>
    <head>
        <title>{{ self.title }}</title>
    </head>
    <body>
        <h1>{{ self.title }}</h1>
    </body>
</html>`,
    output: [
      {
        column: 1,
        line: 2,
        code: "html_has_lang",
        message:
          "The `<html>` tag should have a `lang` attribute with a valid value, describing the main language of the page",
      },
    ],
  },
  lang_set: {
    label: "Lang attribute: set",
    source: `<!DOCTYPE HTML>
<html lang="en">
    <head>
        <title>{{ self.title }}</title>
    </head>
    <body>
        <h1>{{ self.title }}</h1>
    </body>
</html>`,
    output: [],
  },
  role_invalid: {
    label: "ARIA role: invalid",
    source: `<form role="filter">
    {%- for field in search_form -%}
        {% include "field.njk" %}
    {%- endfor -%}
</form>`,
    output: [
      {
        code: "aria_role",
        column: 1,
        line: 1,
        message: "The `role` attribute needs to have a valid value",
      },
    ],
  },
  role_correct: {
    label: "ARIA role: correct",
    source: `<form role="search">
    {%- for field in search_form -%}
        {% include "field.njk" %}
    {%- endfor -%}
</form>`,
    output: [],
  },
  django_as_table: {
    label: "Django: as_table helper",
    source: `<form action="" method="post">
    {% csrf_token %}
    <table>
        {{ form.as_table }}
    </table>
    <button>Submit</button>
</form>`,
    output: [
      {
        code: "django_forms_rendering",
        column: 9,
        line: 4,
        message: "Avoid using `as_table` to render Django forms",
      },
    ],
  },
};

export default fixtures;
