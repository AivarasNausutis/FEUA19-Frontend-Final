import { useState } from "react";
import styles from "./styles.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { loginUser } from "@/api/user";
import Button from "../Button/Button";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPAssword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const onLogin = async () => {
    try {
      const response = await loginUser({ email: email, password: password });

      Cookies.set("Forum-user-jwt-token", response.data.jwt_token);
      router.push("/");
      setErrorMessage("");
    } catch (err) {
      if (err.status === 401) {
        setErrorMessage("You have provided bad credentials");
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Log in to your account</h1>
        <h4>Email</h4>
        <input
          type="email"
          className={styles.input}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <h4>Password</h4>
        <input
          type="password"
          className={styles.input}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPAssword(e.target.value);
          }}
        />
        <Button title="Sign in" onClick={onLogin} />
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <p className={styles.signup}>
          Don't have an account? <a href="/signup">Sign up now</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
