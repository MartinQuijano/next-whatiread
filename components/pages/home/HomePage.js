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
import { usePagination } from "@/hooks/usePagination";
import { add } from "@/services/book";
import Pagination from "@/components/pagination/Pagination";
import Image from "next/image";

export default function HomePage() {
  const [token, setToken] = useState();
  const [books, setBooks] = useState([]);

  const [book, setBook] = useState();
  const [date, setDate] = useState(new Date());

  const { currentPage, totalPages, prevPage, nextPage, changeTotalPages } = usePagination();
  const router = useRouter();

  const {
    register: registerBook,
    handleSubmit: handleSubmitBook,
    formState: { errors: errorsBook },
  } = useForm({
    resolver: yupResolver(bookSchema),
  });

  useEffect(() => {
    setToken(Cookies.get("token"));
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token)
      axios
        .get(`http://localhost:8080/api/v1/user/books?page=${currentPage}&size=2`, {
          headers: {
            Authorization: "Bearer " + Cookies.get("token"),
          },
        })
        .then((res) => {
          console.log(res.data);
          setBooks(res.data.content);
          changeTotalPages(res.data.totalPages);
        })
        .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const addNewBook = () => {
    add(book, date).then(() => {
      router.reload();
    });
  };

  return (
    <main className={styles.main}>
      {!token ? (
        <section className={styles.hero}>
          <div className={styles.information}>
            <h1 className={styles.title}>TRACK YOUR READS, MARK YOUR MOMENTS</h1>
            <h3 className={styles.subtitle}>Centralize your reading journey: all your book records in one place</h3>
          </div>
          <div className={styles.logo_container}>
            <Image className={styles.image} src="/whatiread_hero.png" alt="main_logo" width={0} height={0} sizes="100vw" />
          </div>
        </section>
      ) : (
        <>
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
          <section className={styles.books_container}>
            <div className={styles.books}>
              {books.length > 0 &&
                books.map((book) => (
                  <BookCard key={book.id} title={book.title} date={book.date === null ? "xx/xx/xxxx" : moment(book.date).format("DD/MM/YYYY")} />
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} />
          </section>
        </>
      )}
    </main>
  );
}
