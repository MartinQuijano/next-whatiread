import { http } from "msw";
import { database } from "./database";

const BASE_URL = "http://localhost:8080/api/v1/";

export const handlers = [
  http.get(BASE_URL + "books", (req, res, ctx) => {
    const userBook = database.userBook.getAll();

    return res(ctx.json({ userBook }));
  }),
];
