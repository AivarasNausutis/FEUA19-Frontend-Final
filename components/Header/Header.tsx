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
              <Link href="/question">Ask a question</Link>
            </li>
            <li>
              <Link
                href="/login"
                className={styles.navLink}
                onClick={handleLogout}
              >
                Log Out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
