import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { getItem, setItem, removeItem } from "@/utils/localstorage";
import Button from "../Button/Button";
import Cookie from "js-cookie";
import { config } from "@/config";
import axios from "axios";
import { QuestionType } from "@/types/Question";

export type QuestionCardProps = {
  question_text: string;
  date: Date;
  id: string;
  question: QuestionType;
};

const QuestionCard = ({
  question_text,
  date,
  id,
  question,
}: QuestionCardProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [count, setCount] = useState(() => {
    const item = getItem(`count_${id}`);
    return (item as number) || 0;
  });

  useEffect(() => {
    setItem(`count_${id}`, count);
  }, [count, id]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const onDeleteQuestion = async () => {
    try {
      const jwt_token = Cookie.get("Forum-user-jwt-token");

      const response = await axios.delete(
        `${config.BASE_URL}/question/${question.id}`,
        {
          headers: {
            Authorization: jwt_token,
          },
        }
      );

      if (response.status === 200) {
        removeItem(`count_${id}`);
        window.location.reload();
      }
    } catch (err: any) {
      if (err.response.status === 403) {
        setErrorMessage("This question does not belong to you");
      } else {
        console.log(err);
      }
    }
  };

  const handleLike = () => setCount((prev) => prev + 1);
  const handleDislike = () => setCount((prev) => prev - 1);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.date}>{date.toLocaleString()}</div>
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
        <Button title="Delete" type="DANGER" onClick={onDeleteQuestion} />
      </div>
      <div>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </div>
      <div className={styles.answerSection}>
        <h4 className={styles.answerTitle}>Your answer</h4>
        <input type="text" className={styles.answerInput} />
        <Button title="Submit" onClick={() => {}} />
      </div>
    </div>
  );
};

export default QuestionCard;
