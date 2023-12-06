import React from "react";
import Head from "next/head";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import styles from "./layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>What i read</title>
        <meta name="description" content="What i read website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/isotipo-logo.png" />
      </Head>
      <div className={styles.content}>
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
}
