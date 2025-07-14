import { useState } from "react";
import styles from "../LoginForm/styles.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { registerUser } from "@/api/user";
import Button from "../Button/Button";
import Link from "next/link";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const onRegister = async () => {
    try {
      const response = await registerUser({
        name: name,
        email: email,
        password: password,
      });
      Cookies.set("Forum-user-jwt-token", response.data.jwt_token);
      router.push("/login");
      setErrorMessage("");
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "status" in err &&
        typeof (err as { status?: number }).status === "number"
      ) {
        if ((err as { status: number }).status === 400) {
          setErrorMessage("Registration failed: bad Request");
        }
        if ((err as { status: number }).status === 401) {
          setErrorMessage("Registration failed: bad credentials");
        }
      } else {
        setErrorMessage("An error occurred during registration.");
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Register a new account</h1>
        <h4>Name</h4>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h4>Email</h4>
        <input
          type="email"
          className={styles.input}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h4>Password</h4>
        <input
          type="password"
          className={styles.input}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button title="Sign up" onClick={onRegister} />
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <p className={styles.signup}>
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
