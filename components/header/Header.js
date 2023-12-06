import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";

export default function Header() {
  const [token, setToken] = useState();
  const router = useRouter();

  useEffect(() => {
    setToken(Cookies.get("token"));
  }, [router.pathname]);

  const logout = () => {
    Cookies.remove("token");
    setToken();
    router.reload();
  };

  return (
    <div className={styles.display}>
      <div className={styles.logo_title}>
        <Link className={styles.logolink} href="/">
          <div className={styles.logo_container}>
            <Image className={styles.image} src="/icons/whatiread-icon.png" alt="main_logo" width={0} height={0} sizes="100vw" />
          </div>
        </Link>
        <p className={styles.title}>What i read</p>
      </div>
      <nav className={styles.options}>
        {token ? (
          <button className={styles.header_option} onClick={logout}>
            Logout
          </button>
        ) : (
          <>
            <Link className={`link ${styles.link}`} href="/login">
              Login
            </Link>
            <Link className={`link ${styles.link}`} href="/register">
              Register
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}
