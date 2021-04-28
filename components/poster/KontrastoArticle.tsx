import Image from "next/image";
import dynamic from "next/dynamic";
import Heading from "../Heading";
import KontrastoDemo from "./KontrastoDemo";

const KontrastoArticle = () => {
  return (
    <article className="min-h-screen col-span-2" aria-labelledby="kontrasto">
      <span className="align-top me-2">
        <Image
          src="/kontrasto/kontrasto-logo.svg"
          alt=""
          width={40}
          height={40}
        />
      </span>
      <Heading level="h2" id="kontrasto" className="text-kontrasto-pink">
        Kontrasto
      </Heading>
      <div className="grid gap-8">
        <div>
          <p>
            Kontrasto is an early attempt at reaching the holy grail of
            automated color contrast enforcement, ridding the world of
            unreadable text on image backgrounds once and for all. Here is the
            problem statement as an image worth a thousand words:
          </p>
          <Image
            src="/kontrasto/kontrasto-problem-statement.jpg"
            alt="Text on a background that is hard to read: “Can you read this text”"
            width={803}
            height={363}
          />
          <p>
            This is{" "}
            <a href="https://whocanuse.com/?b=c0cbc5&c=ffffff&f=20&s=">
              poor contrast
            </a>{" "}
            by all standards, and particularly for{" "}
            <a href="https://www.w3.org/TR/WCAG21/">WCAG</a>, the most common
            accessibility compliance target. We can do better.
          </p>
        </div>
      </div>
      <section aria-labelledby="kontrasto-demo">
        <Heading id="kontrasto-demo">
          <span className="sr-only">kontrasto </span>Demo
        </Heading>
        {/* <a
          href="https://pypi.org/project/kontrasto/"
          className="inline-block ms-4 align-text-top"
          aria-label="View kontrasto on PyPI"
        >
          <img
            alt=""
            src="https://img.shields.io/pypi/v/kontrasto"
            width="86"
            height="20"
          />
        </a> */}
        <p className="mt-4 mb-8">
          Let’s see how Kontrasto processes images like this.
        </p>
        <div className="hidden print:block">
          <p>
            <strong className="text-3xl">
              Live demo:{" "}
              <a href="https://python-accessibility-ftw.vercel.app/">
                python-accessibility-ftw.vercel.app
              </a>
            </strong>
          </p>
        </div>
        <div className="print:hidden">
          <KontrastoDemo />
        </div>
      </section>
      <section aria-labelledby="why-automate-contrast">
        <Heading id="why-automate-contrast">Why automate this</Heading>
        <p>TODO</p>
      </section>

      <section aria-labelledby="automated-contrast-drawbacks">
        <Heading id="automated-contrast-drawbacks">
          Drawbacks
          <span className="sr-only"> of automated contrast checks</span>
        </Heading>
        <p>TODO</p>
      </section>
      <section aria-labelledby="kontrasto-inspiration-alternatives">
        <Heading id="kontrasto-inspiration-alternatives">
          Inspiration & alternatives
          <span className="sr-only"> for Kontrasto</span>
        </Heading>
        <p>TODO</p>
      </section>
    </article>
  );
};

export default KontrastoArticle;
