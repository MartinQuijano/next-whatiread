import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BookCard from "@/components/book-card/BookCard";
import axios from "axios";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { bookSchema } from "@/models/validationSchemas/book";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment/moment";
import styles from "./homepage.module.css";

export default function HomePage() {
  const [books, setBooks] = useState([]);

  const [book, setBook] = useState();
  const [date, setDate] = useState(new Date());

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();

  const router = useRouter();

  const {
    register: registerBook,
    handleSubmit: handleSubmitBook,
    formState: { errors: errorsBook },
  } = useForm({
    resolver: yupResolver(bookSchema),
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (token)
      axios
        .get(`http://localhost:8080/api/v1/user/books?page=${currentPage}&size=10`, {
          headers: {
            Authorization: "Bearer " + Cookies.get("token"),
          },
        })
        .then((res) => {
          console.log(res.data);
          setBooks(res.data.content);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => console.log(err));
  }, [currentPage]);

  const addBook = () => {
    const data = {
      title: book,
      date: date,
    };
    axios
      .post("http://localhost:8080/api/v1/books", data, {
        headers: {
          Authorization: "Bearer " + Cookies.get("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        router.reload();
      })
      .catch((err) => console.log(err));
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage((prevPage) => prevPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <main className={styles.main}>
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
          <button className={styles.button} type="submit" onClick={handleSubmitBook(addBook)}>
            Add
          </button>
        </form>
        {errorsBook.title && <span className={styles.error}>{errorsBook.title.message}</span>}
      </section>
      <section className={styles.books_container}>
        <div className={styles.books}>
          {books.length > 0 &&
            books.map((book) => (
              <BookCard key={book.id} title={book.title} date={book.date === null ? "xx/xx/xxxx" : moment(book.date).format("DD/MM/YYYY")} />
            ))}
        </div>
        <div className={styles.pagination_controls}>
          <button className={styles.button} onClick={prevPage} disabled={currentPage === 0}>
            Prev
          </button>
          {currentPage + 1} - {totalPages}
          <button className={styles.button} onClick={nextPage} disabled={currentPage === totalPages - 1}>
            Next
          </button>
        </div>
      </section>
    </main>
  );
}
