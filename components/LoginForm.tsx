import styles from "./styles.module.css";

const LoginForm = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Log in to your account</h1>
      <h4>Email</h4>
      <input
        type="email"
        className={styles.input}
        placeholder="Enter your email"
      />
      <h4>Password</h4>
      <input
        type="password"
        className={styles.input}
        placeholder="Enter your password"
      />
      <button type="submit">Sign in</button>
      <p className={styles.signup}>
        Don't have an account? <a href="/signup">Sign up now</a>
      </p>
    </div>
  );
};

export default LoginForm;
