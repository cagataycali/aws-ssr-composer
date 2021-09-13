import Head from "next/head";
import "../styles/globals.css";
import React from "react";

//This is a part of a hack I need (sorry for that). Take a look at next.config.js
globalThis.React = React;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script src="https://app2.ssr.aws.cagatay.dev/web/remoteEntry.js" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
