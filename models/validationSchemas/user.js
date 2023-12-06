import { object, string } from "yup";

export const userSchema = object({
  username: string().required("Username is a required field."),
  password: string().min(6, "Password must be at least 6 characters.").required("Password is a required field."),
});
