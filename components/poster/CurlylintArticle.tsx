import Image from "next/image";
import dynamic from "next/dynamic";
import Heading from "../../components/Heading";
import CurlylintDemo from "./CurlylintDemo";

const CurlylintArticle = () => {
  return (
    <article className="min-h-screen col-span-3" aria-labelledby="curlylint">
      <span className="align-top me-2">
        <Image
          src="/curlylint/curlylint-logo.svg"
          alt=""
          width={100}
          height={40}
        />
      </span>
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
              <a href="https://pypi.org/project/curlylint/">from PyPI</a>{" "}
              currently with{" "}
              <a href="https://www.curlylint.org/docs/rules/all">
                8 linting rules
              </a>
              .
            </li>
            <li>
              Originally a fork of{" "}
              <a href="https://github.com/motet-a/jinjalint">jinjalint</a>,
              using a custom parser built with{" "}
              <a href="https://parsy.readthedocs.io/">parsy</a>.
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
            width={1126}
            height={230}
          />
        </div>
        <div>
          <p>
            <strong>When linting a template,</strong>
          </p>
          <ol>
            <li>Curlylint loads and parses the template source.</li>
            <li>
              It then runs its rules on the template syntax <em>and</em> HTML.
            </li>
            <li>Any errors are reported back as output.</li>
          </ol>
        </div>
      </div>
      <section aria-labelledby="curlylint-demo">
        <Heading id="curlylint-demo">
          <span className="sr-only">Curlylint </span>Demo
        </Heading>
        <a
          href="https://pypi.org/project/curlylint/"
          className="inline-block ms-4 align-text-top"
          aria-label="View curlylint on PyPI"
        >
          <img
            alt=""
            src="https://img.shields.io/pypi/v/curlylint"
            width="86"
            height="20"
          />
        </a>
        <p className="mt-4 mb-8">
          Try it for yourself by{" "}
          <a href="https://www.curlylint.org/docs/">
            installing curlylint locally
          </a>{" "}
          (<code>pip install curlylint</code>), or with the live demo{" "}
          <span className="print:hidden">
            – use one of the predefined examples, or try it out on your own
            templates
          </span>
          .
        </p>
        <div className="hidden print:block">
          <p>
            <strong className="text-3xl">
              Live demo:{" "}
              <a href="https://accessibility-loves-python.vercel.app/">
                accessibility-loves-python.vercel.app
              </a>
            </strong>
          </p>
        </div>
        <div className="print:hidden">
          <CurlylintDemo />
        </div>
      </section>
      <div className="grid grid-cols-2">
        <section aria-labelledby="why-linting-templates">
          <Heading id="why-linting-templates">Why linting templates</Heading>
          <p>There are two primary reasons:</p>
          <ol>
            <li>The sooner errors are caught, the easier to fix.</li>
            <li>
              Static analysis as-you-code is very low-friction for developers.
            </li>
          </ol>
          <p>
            This concept of the “cost of fixing errors” is often represented by
            a chart of the “relative cost of fixing defects” (©{" "}
            <a href="https://www.nist.gov/">NIST</a>) depending on when they are
            introduced in a project:
          </p>
          <Image
            src="/curlylint/IBM-System-Science-Institute-Relative-Cost-of-Fixing-Defects.png"
            alt="Relative cost of fixing defects: Design = 1, Implementation = 6.5, Testing = 15, Maintenance = 100"
            width={769}
            height={384}
          />
          <p>
            <a href="https://en.wikipedia.org/wiki/Static_program_analysis">
              Static analysis
            </a>{" "}
            is a common approach to this problem – Coding errors can’t be caught
            any sooner than as developers are writing code, and friction is
            lowest when receiving feedback while authoring code, rather than in
            a separate environment.
          </p>
          <p>
            More generally, this is part of a testing methodology called “
            <a href="https://www.stickyminds.com/article/shift-left-approach-software-testing">
              Shift Left
            </a>
            ”, moving the quality assurance (QA) effort towards earlier project
            phases. This is particularly relevant{" "}
            <a href="https://feather.ca/shift-left/">
              in accessibility as a field
            </a>
            , which used to primarily be in the remit of testers.
          </p>
          <p>
            Another clear advantage of linting templates is our ability to flag
            not just HTML issues, but also{" "}
            <strong>issues with template syntax</strong>. For example, Django’s{" "}
            <a href="https://docs.djangoproject.com/en/3.2/topics/forms/">
              <code>as_table</code>
            </a>{" "}
            can lead to{" "}
            <a href="https://code.djangoproject.com/ticket/32339">
              hard-to-navigate forms
            </a>{" "}
            for screen reader users – in this case, feedback at the template
            level will be much more actionable (“don’t use as_table”, rather
            than “avoid using tables for forms layout”).
          </p>
        </section>

        <section aria-labelledby="linting-templates-drawbacks">
          <Heading id="linting-templates-drawbacks">
            Drawbacks<span className="sr-only"> of linting templates</span>
          </Heading>
          <p>
            Since linters rely on static analysis, they can only find issues
            that are apparent without running the code.
            <br />
            This can lead to a false sense of security for developers – who can
            assume their testing tools are enough, even though they can only
            catch a small proprotion of issues.
          </p>
          <p>
            This is a common issue in the field of accessibility, where even the
            most powerful browser-based automated tools only catch{" "}
            <a href="https://alphagov.github.io/accessibility-tool-audit/">
              30 to 40% of issues
            </a>
            .
          </p>
          <hr />
          <p>
            In the case of Curlylint, another clear drawback is the cost of
            putting together those static analysis features, relative to their
            usefulness.
            <br />
            Curlylint has to use a custom templates parser, as it needs an{" "}
            <abbr title="Abstract Syntax Tree">AST</abbr> representation of both
            the templates syntax, and the HTML code – built-in parsers of
            various template languages tend to treat HTML as arbitrary strings.
          </p>
          <p>
            This is in a sense an opportunity cost – an investment in
            browser-based testing tools having much more potential to find
            advanced issues, with a lower implementation cost.
          </p>
        </section>
      </div>
      <section aria-labelledby="curlylint-inspiration-alternatives">
        <Heading id="curlylint-inspiration-alternatives">
          Inspiration & alternatives
          <span className="sr-only"> for Curlylint</span>
        </Heading>
        <p>
          Curlylint started as a fork of{" "}
          <a href="https://github.com/motet-a/jinjalint">jinjalint</a>, but the
          main inspiration for the project comes from the React world with{" "}
          <a href="https://github.com/jsx-eslint/eslint-plugin-jsx-a11y">
            eslint-plugin-jsx-a11y
          </a>
          ,{" "}
          <em>a static AST checker for accessibility rules on JSX elements</em>.
        </p>
        <p>
          For serious testing, the{" "}
          <a href="https://github.com/validator/validator">
            V.Nu HTML5 validator
          </a>{" "}
          can be{" "}
          <a href="https://github.com/peterbe/django-html-validator">
            integrated with Django
          </a>
          . For in-browser testing,{" "}
          <a href="https://github.com/dequelabs/axe-core">Axe</a> is the most
          well established open-source option. Axe makers Deque are also working
          on a similar{" "}
          <a href="https://marketplace.visualstudio.com/items?itemName=deque-systems.vscode-axe-linter">
            Axe linter
          </a>{" "}
          concept, which is unfortunately closed-source.
        </p>
      </section>
    </article>
  );
};

export default CurlylintArticle;
