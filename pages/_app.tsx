import "tailwindcss/tailwind.css";
import "./_app.css";

import Head from "next/head";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Improving web accessibility with Python | PyCon US 2021</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#00bc74" />
        <meta name="msapplication-TileColor" content="#00bc74" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
