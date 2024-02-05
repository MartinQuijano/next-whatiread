import React, { useEffect, useState } from "react";
import styles from "./library.module.css";
import Pagination from "@/components/pagination/Pagination";
import BookCard from "@/components/book-card/BookCard";
import { usePagination } from "@/hooks/usePagination";
import Cookies from "js-cookie";
import moment from "moment";
import { getBooks } from "@/services/book";
import BookInputForm from "@/components/book-input-form/BookInputForm";
import Filters from "@/components/filters/Filters";

export default function Library() {
  const [books, setBooks] = useState([]);
  const [sort, setSort] = useState();
  const [order, setOrder] = useState("asc");

  const { currentPage, totalPages, prevPage, nextPage, changeTotalPages } = usePagination();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token)
      getBooks(currentPage, sort, order).then((res) => {
        setBooks(res.data.content);
        changeTotalPages(res.data.totalPages);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, sort, order]);

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  const handleOrderChange = () => {
    let newOrder;
    if (order === "asc") newOrder = "desc";
    else newOrder = "asc";
    setOrder(newOrder);
  };

  return (
    <section className={styles.container}>
      <BookInputForm />
      <Filters sort={sort} handleSortChange={handleSortChange} order={order} handleOrderChange={handleOrderChange} />
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
