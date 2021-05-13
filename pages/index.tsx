import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import Heading from "../components/Heading";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CurlylintArticle from "../components/poster/CurlylintArticle";
import KontrastoArticle from "../components/poster/KontrastoArticle";

const Index = () => {
  return (
    <>
      <Header />
      <main className="grid 2xl:grid-cols-6 gap-4 2xl:gap-10 p-4 print:ps-0 print:pe-0">
        <CurlylintArticle />
        <KontrastoArticle></KontrastoArticle>
        {/* <article className="min-h-screen" aria-labelledby="why">
          <h2 id="why">Why Python is such a good fit</h2>
        </article> */}
      </main>
      <Footer />
    </>
  );
};

export default Index;
