import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./styles.module.css";
import Cookie from "js-cookie";

type PageTemplateProps = {
  children: React.ReactNode;
};

const PageTemplate = ({ children }: PageTemplateProps) => {
  const [headerType, setHeaderType] = useState<"SHOW" | "NOSHOW">("NOSHOW");

  useEffect(() => {
    const jwtToken = Cookie.get("Forum-user-jwt-token");
    setHeaderType(jwtToken ? "SHOW" : "NOSHOW");
  }, []);

  return (
    <div className={styles.main}>
      <Header type={headerType} />
      <div className={styles.contentWrapper}>{children}</div>
      <Footer />
    </div>
  );
};

export default PageTemplate;
