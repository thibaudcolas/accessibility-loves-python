import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import Heading from "../components/Heading";
import CurlylintArticle from "../components/poster/CurlylintArticle";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Index = () => {
  return (
    <>
      <Header />
      <main className="grid 2xl:grid-cols-6 gap-8 p-4">
        <CurlylintArticle />
        <article
          className="min-h-screen col-span-2"
          aria-labelledby="kontrasto"
        >
          <h2 id="kontrasto">
            Kontrasto
            <br />
            <small>Automated color contrast checker</small>
          </h2>
          <section aria-labelledby="kontrasto-demo">
            <Heading id="kontrasto-demo">
              <span className="sr-only">Kontrasto </span>Demo
            </Heading>
          </section>
        </article>
        <article
          className="min-h-screen"
          aria-labelledby="why-this-is-relevant-to-python-developers"
        >
          <h2 id="why-this-is-relevant-to-python-developers">
            Why this is relevant for Python developers
          </h2>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default Index;
