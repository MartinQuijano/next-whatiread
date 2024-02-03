import React from "react";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./homepage.module.css";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.content}>
          <div className={styles.information}>
            <h1 className={styles.title}>
              <span className={styles.mark}>TRACK</span> YOUR READS, <span className={styles.mark}>MARK</span> YOUR MOMENTS
            </h1>
            <h3 className={styles.subtitle}>Centralize your reading journey: all your book records in one place</h3>
          </div>
          <div className={styles.logo_container}>
            <Image className={styles.image} src="/whatiread_hero.png" alt="main_logo" width={0} height={0} sizes="100vw" />
          </div>
        </div>
      </section>
    </main>
  );
}
