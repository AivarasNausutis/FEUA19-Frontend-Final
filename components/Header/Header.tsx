import styles from "./styles.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

type HeaderProps = {
  type?: "SHOW" | "NOSHOW";
};

const Header = ({ type = "SHOW" }: HeaderProps) => {
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove("Forum-user-jwt-token");
  };

  return (
    <>
      <div className={styles.container}>
        <div onClick={() => router.push("/")} className={styles.logo}>
          Forum App
        </div>
        <nav className={`${styles.nav} ${styles[type]}`}>
          <ul>
            <li>
              <a href="/question">Ask a question</a>
            </li>
            <li>
              <a
                href="/login"
                onClick={handleLogout}
                className={styles.navLink}
              >
                Log Out
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
