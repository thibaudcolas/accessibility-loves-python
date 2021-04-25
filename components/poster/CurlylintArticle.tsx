import Image from "next/image";
import dynamic from "next/dynamic";
import Heading from "../../components/Heading";

import fixtures from "../../utils/curlylint/fixtures";

const Editor = dynamic(import("../../components/Editor"), { ssr: false });

const CurlylintArticle = () => {
  return (
    <article className="min-h-screen" aria-labelledby="curlylint">
      <Heading level="h2" id="curlylint" className="text-curlylint-pink">
        Curlylint
      </Heading>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p>
            <a href="https://www.curlylint.org">Curlylint</a> is an experimental
            linter for HTML templates, with a particular focus on flagging
            accessibility issues.
            <br />
            Traditional accessibility testing tools rely on a web browser
            environment, which makes it possible to do comprehensive automated
            checks, but is removed from when developers author templates.
          </p>
        </div>
        <div>
          <p>
            <strong>In summary,</strong>
          </p>
          <ul>
            <li>
              It’s a <abbr title="Command-Line Interface">CLI</abbr> available{" "}
              <a href="https://pypi.org/project/curlylint/">from PyPI</a>.
            </li>
            <li>
              Originally a fork of{" "}
              <a href="https://github.com/motet-a/jinjalint">jinjalint</a>.
            </li>
            <li>
              Aiming to support{" "}
              <a href="https://jinja.palletsprojects.com/">Jinja</a>,{" "}
              <a href="https://mozilla.github.io/nunjucks/">Nunjucks</a>,{" "}
              <a href="https://docs.djangoproject.com/en/dev/topics/templates/">
                Django Templates
              </a>
              , <a href="https://twig.symfony.com">Twig</a>,{" "}
              <a href="https://shopify.github.io/liquid/">Liquid</a>.
            </li>
            <li>
              Using a custom parser built with{" "}
              <a href="https://parsy.readthedocs.io/">parsy</a>.
            </li>
            <li>
              There are{" "}
              <a href="https://www.curlylint.org/docs/rules/all">
                8 linting rules
              </a>
              .
            </li>
          </ul>
        </div>
        <div>
          <p>
            Here’s what it can flag – linting a basic{" "}
            <a href="https://github.com/thibaudcolas/curlylint/blob/main/tests/django/wagtailcore/page.html">
              page.html Django template
            </a>{" "}
            where a <code>lang</code> attribute is missing:
          </p>
          <Image
            src="/curlylint/curlylint-demo.png"
            alt="Screenshot of running curlylint on a template. Output: 1 error reported, with the error message."
            width={563}
            height={115}
          />
        </div>
        <div>
          <p>
            <strong>When linting a template,</strong>
          </p>
          <ol>
            <li>Curlylint loads and parses the template source.</li>
            <li>It then runs its rules on the template syntax and HTML.</li>
            <li>Any errors are reported back as output.</li>
          </ol>
        </div>
      </div>
      <section aria-labelledby="curlylint-demo">
        <Heading id="curlylint-demo">
          <span className="sr-only">Curlylint </span>Demo
        </Heading>
        <p>
          You can try it for yourself by{" "}
          <a href="https://www.curlylint.org/docs/">
            installing curlylint locally
          </a>{" "}
          (<code>pip install curlylint</code>), or with this live demo – use one
          of the predefined examples, or enter your own templates.
        </p>
        <Editor
          value={fixtures.missing_lang.source}
          annotations={fixtures.missing_lang.output}
          onChange={() => {
            fetch("/api/lint")
              .then((response) => response.json())
              .then((data) => console.log(data));
          }}
        />
      </section>
      <section aria-labelledby="why-linting-templates">
        <Heading id="why-linting-templates">Why linting templates</Heading>
      </section>
      <section aria-labelledby="linting-templates-drawbacks">
        <Heading id="linting-templates-drawbacks">
          Drawbacks<span className="sr-only"> of linting templates</span>
        </Heading>
      </section>
      <section aria-labelledby="curlylint-inspiration-alternatives">
        <Heading id="curlylint-inspiration-alternatives">
          Inspiration & alternatives
          <span className="sr-only"> for Curlylint</span>
        </Heading>
      </section>
    </article>
  );
};

export default CurlylintArticle;
