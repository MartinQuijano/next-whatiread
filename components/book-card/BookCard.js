import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaRegTrashAlt } from "react-icons/fa";
import styles from "./bookcard.module.css";
import { remove } from "@/services/book";

export default function BookCard({ title, date }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const toggleHover = () => {
    setHovered(!hovered);
  };

  const removeBook = () => {
    remove(title).then(() => {
      router.reload();
    });
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
