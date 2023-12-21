import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { MdMenu, MdClose } from "react-icons/md";
import { useToggle } from "@/hooks/useToggle";

const ICONS_SIZE = 26;

export default function Header() {
  const [token, setToken] = useState();
  const router = useRouter();

  const { status: mobileMenuOpen, toggleStatus: setMobileMenuOpen } = useToggle();

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
      <nav className={styles.options + " " + (mobileMenuOpen ? styles.active : "")}>
        {token ? (
          <button className={styles.header_option} onClick={logout}>
            Logout
          </button>
        ) : (
          <>
            <Link className={`link ${styles.link}`} href="/login" onClick={setMobileMenuOpen}>
              Login
            </Link>
            <Link className={`link ${styles.link}`} href="/register" onClick={setMobileMenuOpen}>
              Register
            </Link>
          </>
        )}
      </nav>
      <div className={styles.mobile_options} onClick={setMobileMenuOpen}>
        {mobileMenuOpen ? <MdClose size={ICONS_SIZE} color="#fb7b00" /> : <MdMenu size={ICONS_SIZE} color="#fb7b00" />}
      </div>
    </div>
  );
}
