import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8080/api/v1/";

export const add = async (book, date) => {
  const data = {
    title: book,
    date: date,
  };
  axios
    .post(BASE_URL + "books", data, {
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

export const remove = async (title) => {
  const book = {
    title: title,
  };

  axios
    .delete(BASE_URL + "books", {
      data: book,
      headers: {
        Authorization: "Bearer " + Cookies.get("token"),
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res);
      router.reload();
    })
    .catch((err) => console.log(err));
};
//&sort=book.title,desc
export const getBooks = async (currentPage, search, sort, order) => {
  let URL;
  if (sort) URL = BASE_URL + `user/books?keyword=${search}&page=${currentPage}&size=5&sort=${sort},${order}`;
  else URL = BASE_URL + `user/books?keyword=${search}&page=${currentPage}&size=5`;
  const res = await axios.get(URL, {
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
    },
  });
  return res;
};
