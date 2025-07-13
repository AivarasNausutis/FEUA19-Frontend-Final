import styles from "./styles.module.css";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove("Forum-user-jwt-token");
  };
  return (
    <>
      <div className={styles.container}>
        <div onClick={() => router.push("/")} className={styles.logo}>
          Paragraph
        </div>
        <nav>
          <ul>
            <li>
              <a href="/question">Ask a question</a>
            </li>
            <li>
              <a href="/login" onClick={handleLogout}>
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
