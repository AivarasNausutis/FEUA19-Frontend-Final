import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./styles.module.css";

type PageTemplateProps = {
  children: React.ReactNode;
};

const PageTemplate = ({ children }: PageTemplateProps) => {
  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.contentWrapper}>{children}</div>
      <Footer />
    </div>
  );
};

export default PageTemplate;
