import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { FaRegTrashAlt } from "react-icons/fa";
import styles from "./bookcard.module.css";

export default function BookCard({ title, date }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const toggleHover = () => {
    setHovered(!hovered);
  };

  const removeBook = () => {
    const book = {
      title: title,
    };

    axios
      .delete("http://localhost:8080/api/v1/books", {
        data: book,
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        router.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.book_card} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
      <div className={styles.information}>
        <p className={styles.title}>{title}</p>
        <p className={styles.date}>{date}</p>
      </div>
      {hovered && (
        <div className={styles.corner_flip} onClick={removeBook}>
          <FaRegTrashAlt />
        </div>
      )}
    </div>
  );
}
