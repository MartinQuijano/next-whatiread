import { object, string } from "yup";

export const bookSchema = object({
  title: string().required("Title is a required field."),
});
