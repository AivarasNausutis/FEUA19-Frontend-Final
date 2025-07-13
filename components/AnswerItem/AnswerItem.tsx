import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { AnswerItemProps } from "@/types/Answer";
import Button from "../Button/Button";
import { getItem, setItem, removeItem } from "@/utils/localstorage";

const AnswerItem = ({
  id,
  answer_text,
  date,
  gained_likes_number,
  question_id,
}: AnswerItemProps) => {
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
    <div className={styles.answerCard}>
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
        <Button title="Delete" type="DANGER" onClick={""} />
      </div>
      <div className={styles.answerBody}>
        <p className={styles.answerText}>{answer_text}</p>
      </div>
    </div>
  );
};

export default AnswerItem;
