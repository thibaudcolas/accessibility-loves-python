import Image from "next/image";
import dynamic from "next/dynamic";
import Heading from "../Heading";
import KontrastoDemo from "./KontrastoDemo";

const KontrastoArticle = () => {
  return (
    <article
      className="min-h-screen col-span-3 2xl:border-l-2 pl-4 border-gray-light-mid"
      aria-labelledby="kontrasto"
    >
      <span className="align-top me-2">
        <Image
          src="/kontrasto/kontrasto-logo.svg"
          alt=""
          width={40}
          height={40}
        />
      </span>
      <Heading level="h2" id="kontrasto" className="text-kontrasto-pink">
        <span className="border-2">Kontrasto</span>
        <span
          className="border-2 text-white border-black bg-black"
          aria-hidden="true"
        >
          Kontrasto
        </span>
      </Heading>
      <div className="grid gap-8">
        <div>
          <p>
            <a href="https://kontrasto.netlify.app/">Kontrasto</a> is an early
            attempt at reaching the holy grail of automated color contrast
            enforcement, ridding the world of unreadable text on image
            backgrounds once and for all. Here is the problem statement as an
            image worth a thousand words:
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
        <a
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
        </a>
        <p className="mt-4 mb-8">
          Let’s see how Kontrasto processes images. You can try this here, or by{" "}
          <a href="https://github.com/thibaudcolas/kontrasto#usage-in-python">
            installing Kontrasto locally
          </a>{" "}
          (<code>pip install kontrasto</code>) and using its command-line
          interface.
        </p>
        <p>
          In this demo, we display four contrast enhancements with different
          capabilities across 3 areas of each image.
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
          <KontrastoDemo />
        </div>
      </section>
      <section aria-labelledby="how-contrast">
        <Heading id="how-contrast">How this works</Heading>
        <p>
          Kontrasto extracts the dominant color of the image, and then
          calculates that color’s{" "}
          <a href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html">
            contrast ratio
          </a>{" "}
          against dark and light alternatives. We can then select the
          alternative that has the highest contrast.
        </p>
        <p>
          To make this more suitable for real-world websites,{" "}
          <strong>the contrast calculation happens twice</strong>: once
          server-side, so users get the best possible contrast on page load, and
          then once in the browser, so the calculation only samples image pixels
          directly under the text.
        </p>
        <p>
          For the best results possible, we also implement both the WCAG 2.0
          contrast ratio score, and the experimental{" "}
          <a href="https://www.w3.org/TR/wcag-3.0/#visual-contrast-of-text">
            WCAG 3.0 contrast score
          </a>
          , based on more modern research on color perception.
        </p>
      </section>

      <section aria-labelledby="automated-contrast-drawbacks">
        <Heading id="automated-contrast-drawbacks">
          Drawbacks
          <span className="sr-only"> of automated contrast checks</span>
        </Heading>
        <p>
          The main issue with automating color contrast selection is that this
          is very much a problem of design constraints – as such there is no
          single one-size fits all solution.
        </p>
        <p>Here are all of the parameters the text contrast depends on:</p>
        <ul>
          <li>
            Text position on the image (depends on the browser viewport width)
          </li>
          <li>
            Image composition where the text appears over the image (highly
            specific to the image asset being used)
          </li>
          <li>Text color</li>
          <li>Font size of the text</li>
          <li>Font weight of the text</li>
          <li>Base thickness of the font family</li>
        </ul>
        <p>
          Most of those parameters will need to be fixed to a certain value in
          order to calculate contrast. And once contrast is calculated, any of
          those parameters could be equally worth changing to improve the
          contrast!
        </p>
        <p>
          Here is the{" "}
          <a href="https://www.myndex.com/APCA/">
            proposed calculation for WCAG 3.0
          </a>
          , which surfaces some of those parameters.
        </p>
      </section>
      <section aria-labelledby="kontrasto-inspiration-alternatives">
        <Heading id="kontrasto-inspiration-alternatives">
          Inspiration & alternatives
          <span className="sr-only"> for Kontrasto</span>
        </Heading>
        <ul>
          <li>
            <a href="https://www.brandwood.com/a11y/">
              Text on background image a11y check
            </a>
          </li>
          <li>
            <a href="http://www.kennethcachia.com/background-check/">
              BackgroundCheck
            </a>
          </li>
          <li>
            <a href="https://lokeshdhakar.com/projects/color-thief/">
              Color Thief
            </a>
          </li>
        </ul>
      </section>
    </article>
  );
};

export default KontrastoArticle;
