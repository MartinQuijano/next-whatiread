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
