import { object, string } from "yup";

export const bookSearchSchema = object({
  title: string(),
});
