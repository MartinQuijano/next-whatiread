import React from "react";
import styles from "./searchform.module.css";
import { bookSearchSchema } from "@/models/validationSchemas/bookSearch";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SearchForm({ search, handleSearchChange, handleSearch }) {
  const {
    register: registerBookSearch,
    handleSubmit: handleSubmitBookSearch,
    formState: { errors: errorsBookSearch },
  } = useForm({
    resolver: yupResolver(bookSearchSchema),
  });

  return (
    <>
      <form className={styles.search_form} onSubmit={() => {}}>
        <input
          className={styles.input}
          type="text"
          name="title"
          value={search || ""}
          placeholder="Search by title"
          {...registerBookSearch("title", { onChange: (e) => handleSearchChange(e.target.value) })}
          autoFocus
        />
        <button className={"button"} type="submit" onClick={handleSubmitBookSearch(handleSearch)}>
          Search
        </button>
      </form>
      {errorsBookSearch.title && <span className={styles.error}>{errorsBookSearch.title.message}</span>}
    </>
  );
}
