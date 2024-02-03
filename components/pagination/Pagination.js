import React from "react";
import styles from "./pagination.module.css";

export default function Pagination({ currentPage, totalPages, prevPage, nextPage }) {
  return (
    <div className={styles.pagination_controls}>
      <button className={`button`} onClick={prevPage} disabled={currentPage === 0}>
        Prev
      </button>
      <span className={styles.pages}>
        {totalPages > 0 && currentPage + 1} - {totalPages > 0 && totalPages}
      </span>
      <button className={`button`} onClick={nextPage} disabled={currentPage === totalPages - 1}>
        Next
      </button>
    </div>
  );
}
