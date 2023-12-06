import React, { useState } from "react";
import styles from "./register.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/models/validationSchemas/register";
import axios from "axios";

import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastStyle = {
  position: "top-center",
  autoClose: 5000,
  pauseOnHover: true,
  draggable: false,
  transition: Slide,
  style: { background: "#6d6f78", color: "white" },
};

export default function Register() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();

  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: errorsRegister },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const register = () => {
    console.log("Registrando!");
    const data = { username: username, password: password };

    axios
      .post("http://localhost:8080/auth/register", data)
      .then((res) => {
        console.log(res);
        setUsername();
        setPassword();
        setconfirmPassword();
        toast.success("User registered successfully!", toastStyle);
      })
      .catch((err) => {
        console.log("ERROR");
        console.log(err);
        toast.error("User registered successfully!", toastStyle);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.container}>
        <form className={styles.register_form} onSubmit={() => {}}>
          <p className={styles.header}>Register</p>
          <input
            className={styles.input}
            type="text"
            name="username"
            value={username || ""}
            placeholder="Username"
            {...registerRegister("username", { onChange: (e) => setUsername(e.target.value) })}
            autoFocus
          />
          {errorsRegister.username && <span className={styles.error}>{errorsRegister.username.message}</span>}
          <input
            className={styles.input}
            type="password"
            name="password"
            value={password || ""}
            placeholder="Password"
            {...registerRegister("password", { onChange: (e) => setPassword(e.target.value) })}
          />
          {errorsRegister.password && <span className={styles.error}>{errorsRegister.password.message}</span>}
          <input
            className={styles.input}
            type="password"
            name="confirmPassword"
            value={confirmPassword || ""}
            placeholder="Confirm password"
            {...registerRegister("confirmPassword", { onChange: (e) => setconfirmPassword(e.target.value) })}
          />
          {errorsRegister.confirmPassword && <span className={styles.error}>{errorsRegister.confirmPassword.message}</span>}
          <button className={styles.button} type="submit" onClick={handleSubmitRegister(register)}>
            Register
          </button>
        </form>
      </div>
    </>
  );
}
