import React from "react";
import styles from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={styles.display}>
      <p className={styles.text}>Developed by Martín Nahuel Quijano</p>
      <Link className={`link ${styles.link}`} href="https://mnquijano.netlify.app/">
        Portfolio
      </Link>
    </div>
  );
}
