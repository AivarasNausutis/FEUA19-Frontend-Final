import React from "react";
import styles from "./styles.module.css";

export type QuestionCardProps = {
  question_text: string;
  date: Date;
  id: string;
};

const QuestionCard = ({ question_text, date, id }: QuestionCardProps) => {
  const [likeCount, setLikeCount] = React.useState(0);

  const handleLike = () => setLikeCount(likeCount + 1);
  const handleDislike = () => setLikeCount(likeCount - 1);

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
            (likeCount > 0
              ? " " + styles.plus
              : likeCount < 0
              ? " " + styles.minus
              : "")
          }
        >
          {likeCount}
        </div>
        <div onClick={handleDislike} className={styles.dislike}></div>
      </div>
    </div>
  );
};

export default QuestionCard;
