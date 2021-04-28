import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

import Select from "../../components/Select";
import CheckboxField from "../../components/CheckboxField";
import fixtures from "../../utils/curlylint/fixtures";
import { delayAndIdle } from "../../utils/delay";

const Editor = dynamic(import("../../components/Editor"), { ssr: false });

const editorThemes = [
  { value: "monokai", label: "Dark" },
  { value: "xcode", label: "Light" },
];

const fixturesOptions = Object.entries(fixtures).map(([value, fixture]) => ({
  value,
  label: fixture.label,
}));

const getDefaultTheme = () => {
  try {
    if (window.localStorage) {
      return window.localStorage.getItem("theme") || "monokai";
    }
  } catch {}
  return "monokai";
};

const fetchLintOutput = (body) =>
  fetch("/api/lint", {
    method: "POST",
    mode: "same-origin",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "error",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(body),
  });

const CurlylintDemo = () => {
  const [theme, setTheme] = useState(getDefaultTheme());
  const [example, setExample] = useState("missing_lang");
  const [parse_only, set_parse_only] = useState(false);
  const [aria_role, set_aria_role] = useState(true);
  const [django_forms_rendering, set_django_forms_rendering] = useState(true);
  const [html_has_lang, set_html_has_lang] = useState(true);
  const [image_alt, set_image_alt] = useState(true);
  const [meta_viewport, set_meta_viewport] = useState(true);
  const [no_autofocus, set_no_autofocus] = useState(true);
  const [tabindex_no_positive, set_tabindex_no_positive] = useState(true);
  const [template_source, set_template_source] = useState(
    fixtures.lang_missing.source,
  );
  const [annotations, setAnnotations] = useState(fixtures.lang_missing.output);
  const handle = useRef(null);
  useEffect(() => {
    handle.current = delayAndIdle(
      () => {
        fetchLintOutput({
          template_source,
          parse_only,
          aria_role,
          django_forms_rendering,
          html_has_lang,
          image_alt,
          meta_viewport,
          no_autofocus,
          tabindex_no_positive,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setAnnotations(data.issues);
          });
      },
      handle.current,
      500,
    );

    return () => {
      if (handle.current) {
        window.clearTimeout(handle.current);
      }
    };
  }, [
    template_source,
    parse_only,
    aria_role,
    django_forms_rendering,
    html_has_lang,
    image_alt,
    meta_viewport,
    no_autofocus,
    tabindex_no_positive,
  ]);

  useEffect(() => {
    if (window.localStorage) {
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);
  return (
    <div className="grid 2xl:grid-cols-2 gap-4">
      <Editor
        key={example}
        theme={theme}
        value={template_source}
        annotations={annotations}
        onChange={set_template_source}
      />
      <div>
        <div className="block">
          <label htmlFor="curlylint_example" className="inline-block mb-8 me-4">
            Demo
            <Select
              id="curlylint_example"
              value={example}
              className="border-2 rounded-sm p-2 border-gray-mid-dark ms-4"
              options={fixturesOptions}
              onChange={(value) => {
                setExample(value);
                set_template_source(fixtures[value].source);
                setAnnotations(fixtures[value].output);
              }}
            ></Select>
          </label>
          <label htmlFor="curlylint_theme" className="inline-block mb-8">
            Theme
            <Select
              id="curlylint_theme"
              value={theme}
              className="border-2 rounded-sm p-2 border-gray-mid-dark ms-4"
              options={editorThemes}
              onChange={setTheme}
            ></Select>
          </label>
        </div>
        <CheckboxField
          id="parse_only"
          checked={parse_only}
          onChecked={set_parse_only}
          help="Don’t lint, check for syntax errors and exit."
        />
        <CheckboxField
          id="django_forms_rendering"
          checked={django_forms_rendering}
          onChecked={set_django_forms_rendering}
          help="Disallows using Django’s convenience form rendering helpers, for which the markup isn’t screen-reader-friendly"
        />
        <CheckboxField
          id="html_has_lang"
          checked={html_has_lang}
          onChecked={set_html_has_lang}
          help={
            <span>
              <code>{`<html>`}</code> elements must have a <code>lang</code>{" "}
              attribute, using a{" "}
              <a href="https://www.ietf.org/rfc/bcp/bcp47.txt">BCP 47</a>{" "}
              language tag.
            </span>
          }
        />
        <details>
          <summary>More rules configuration</summary>
          <div className="mt-8">
            <CheckboxField
              id="aria_role"
              checked={aria_role}
              onChecked={set_aria_role}
              help={
                <span>
                  Elements with{" "}
                  <abbr title="Accessible Rich Internet Applications">
                    ARIA
                  </abbr>{" "}
                  roles must use a valid, non-abstract{" "}
                  <abbr title="Accessible Rich Internet Applications">
                    ARIA
                  </abbr>{" "}
                  role
                </span>
              }
            />
            <CheckboxField
              id="image_alt"
              checked={image_alt}
              onChecked={set_image_alt}
              help={
                <span>
                  <code>{`<img>`}</code> elements must have a <code>alt</code>{" "}
                  attribute, either with meaningful text, or an empty string for
                  decorative images
                </span>
              }
            />
            <CheckboxField
              id="meta_viewport"
              checked={meta_viewport}
              onChecked={set_meta_viewport}
              help={
                <span>
                  The <code>viewport</code> meta tag should not use{" "}
                  <code>user-scalable=no</code>, and <code>maximum-scale</code>{" "}
                  should be 2 or above, so end users can zoom
                </span>
              }
            />
            <CheckboxField
              id="no_autofocus"
              checked={no_autofocus}
              onChecked={set_no_autofocus}
              help="Enforce autofocus is not used on inputs. Autofocusing elements can cause usability issues for sighted and non-sighted users."
            />
            <CheckboxField
              id="tabindex_no_positive"
              checked={tabindex_no_positive}
              onChecked={set_tabindex_no_positive}
              help={
                <span>
                  Prevents using positive <code>tabindex</code> values, which
                  are very easy to misuse with problematic consequences for
                  keyboard users.
                </span>
              }
            />
          </div>
        </details>
      </div>
    </div>
  );
};

export default CurlylintDemo;
