import styles from "./styles.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <>
      <div className={styles.container}>
        <div onClick={() => router.push("/")} className={styles.logo}>
          Paragraph
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/question">Ask a question</Link>
            </li>
            <li>
              <Link href="/login">Log Out</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
