import React from "react";
import styles from "./filters.module.css";
import Dropdown from "../dropdown/Dropdown";

export default function Filters({ sort, handleSortChange, handleOrderChange }) {
  const options = [
    { name: "Title", filter: "book.title" },
    { name: "Date", filter: "date" },
  ];
  return (
    <div className={styles.container}>
      <Dropdown title={sort} options={options} handleSelection={handleSortChange} handleSameSelection={handleOrderChange} />
    </div>
  );
}
