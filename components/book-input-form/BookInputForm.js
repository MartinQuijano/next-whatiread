import React, { useState } from "react";
import styles from "./bookinputform.module.css";
import DatePicker from "react-datepicker";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { add } from "@/services/book";
import { useRouter } from "next/router";
import { bookSchema } from "@/models/validationSchemas/book";

export default function BookInputForm() {
  const [book, setBook] = useState();
  const [date, setDate] = useState(new Date());
  const router = useRouter();

  const {
    register: registerBook,
    handleSubmit: handleSubmitBook,
    formState: { errors: errorsBook },
  } = useForm({
    resolver: yupResolver(bookSchema),
  });

  const addNewBook = () => {
    add(book, date).then(() => {
      router.reload();
    });
  };

  return (
    <section className={styles.options}>
      <form className={styles.add_book_form} onSubmit={() => {}}>
        <input
          className={styles.input}
          type="text"
          name="title"
          value={book || ""}
          placeholder="Book title"
          {...registerBook("title", { onChange: (e) => setBook(e.target.value) })}
          autoFocus
        />
        <DatePicker className={styles.date_picker} name="title" selected={date} onChange={(date) => setDate(date)} />
        <button className={"button"} type="submit" onClick={handleSubmitBook(addNewBook)}>
          Add
        </button>
      </form>
      {errorsBook.title && <span className={styles.error}>{errorsBook.title.message}</span>}
    </section>
  );
}
