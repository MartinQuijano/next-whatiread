import React, { useEffect, useState } from "react";
import styles from "./library.module.css";
import Pagination from "@/components/pagination/Pagination";
import BookCard from "@/components/book-card/BookCard";
import { usePagination } from "@/hooks/usePagination";
import Cookies from "js-cookie";
import moment from "moment";
import { getBooks } from "@/services/book";
import BookInputForm from "@/components/book-input-form/BookInputForm";

export default function Library() {
  const [books, setBooks] = useState([]);

  const { currentPage, totalPages, prevPage, nextPage, changeTotalPages } = usePagination();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token)
      getBooks(currentPage).then((res) => {
        setBooks(res.data.content);
        changeTotalPages(res.data.totalPages);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <section className={styles.container}>
      <BookInputForm />
      <section className={styles.books_container}>
        <div className={styles.books}>
          {books?.length > 0 &&
            books.map((book) => (
              <BookCard key={book.title} title={book.title} date={book.date === null ? "xx/xx/xxxx" : moment(book.date).format("DD/MM/YYYY")} />
            ))}
        </div>
      </section>
      <Pagination currentPage={currentPage} totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} />
    </section>
  );
}
