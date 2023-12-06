import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./login.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { userSchema } from "@/models/validationSchemas/user";
import axios from "axios";
import Cookies from "js-cookie";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  const {
    register: registerUser,
    handleSubmit: handleSubmitUser,
    formState: { errors: errorsUser },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const login = () => {
    console.log("Logueando!");
    const data = { username: username, password: password };
    axios
      .post("http://localhost:8080/auth/login", data)
      .then((res) => {
        Cookies.set("token", res.data.token, { expires: 1 });
        axios
          .get("http://localhost:8080/api/v1/user/books", {
            headers: {
              Authorization: "Bearer " + res.data.token,
            },
          })
          .then((res) => {
            console.log(res.data);
            router.push("/");
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      <form className={styles.login_form} onSubmit={() => {}}>
        <p className={styles.header}>Login</p>
        <input
          className={styles.input}
          type="text"
          name="username"
          value={username || ""}
          placeholder="Username"
          {...registerUser("username", { onChange: (e) => setUsername(e.target.value) })}
          autoFocus
        />
        {errorsUser.username && <span className={styles.error}>{errorsUser.username.message}</span>}
        <input
          className={styles.input}
          type="password"
          name="password"
          value={password || ""}
          placeholder="Password"
          {...registerUser("password", { onChange: (e) => setPassword(e.target.value) })}
        />
        {errorsUser.password && <span className={styles.error}>{errorsUser.password.message}</span>}
        <button className={styles.button} type="submit" onClick={handleSubmitUser(login)}>
          Log in
        </button>
      </form>
    </div>
  );
}
