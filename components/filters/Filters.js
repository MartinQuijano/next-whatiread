import React from "react";
import styles from "./filters.module.css";
import Dropdown from "../dropdown/Dropdown";
import SearchForm from "../search-form/SearchForm";

export default function Filters({ sort, handleSortChange, handleOrderChange, search, handleSearchChange, handleSearch }) {
  const options = [
    { name: "Title", filter: "book.title" },
    { name: "Date", filter: "date" },
  ];
  return (
    <div className={styles.container}>
      <SearchForm search={search} handleSearchChange={handleSearchChange} handleSearch={handleSearch} />
      <Dropdown title={sort} options={options} handleSelection={handleSortChange} handleSameSelection={handleOrderChange} />
    </div>
  );
}
