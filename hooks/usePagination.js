import { useState } from "react";

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage((prevPage) => prevPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prevPage) => prevPage + 1);
  };

  const changeTotalPages = (numOfPages) => {
    setTotalPages(numOfPages);
  };

  return { currentPage, totalPages, prevPage, nextPage, changeTotalPages };
};
