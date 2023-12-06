import { object, string, ref } from "yup";

export const registerSchema = object({
  username: string().required("Username is a required field."),
  password: string().min(6, "Password must be at least 6 characters.").required("Password is a required field."),
  confirmPassword: string()
    .required("Please confirm your password.")
    .oneOf([ref("password")], "Your passwords do not match."),
});
