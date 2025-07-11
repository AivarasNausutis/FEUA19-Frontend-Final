import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { getItem, setItem } from "@/utils/localstorage";

export type QuestionCardProps = {
  question_text: string;
  date: Date;
  id: string;
};

const QuestionCard = ({ question_text, date, id }: QuestionCardProps) => {
  const [count, setCount] = useState(() => {
    const item = getItem(`count_${id}`);
    return (item as number) || 0;
  });

  useEffect(() => {
    setItem(`count_${id}`, count);
  }, [count, id]);

  const handleLike = () => setCount((prev) => prev + 1);
  const handleDislike = () => setCount((prev) => prev - 1);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.date}>{date.toLocaleString()}</span>
      </div>
      <div className={styles.body}>
        <p className={styles.question}>{question_text}</p>
      </div>
      <div className={styles.actions}>
        <div onClick={handleLike} className={styles.like}></div>
        <div
          className={
            styles.count +
            (count > 0
              ? " " + styles.plus
              : count < 0
              ? " " + styles.minus
              : "")
          }
        >
          {count}
        </div>
        <div onClick={handleDislike} className={styles.dislike}></div>
      </div>
    </div>
  );
};

export default QuestionCard;
