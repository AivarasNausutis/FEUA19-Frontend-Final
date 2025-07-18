import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

import Button from "../Button/Button";
import Cookie from "js-cookie";
import { config } from "@/config";
import axios from "axios";
import { QuestionType } from "@/types/Question";
import AnswerList from "../AnswerList/AnswerList";

export type QuestionCardProps = {
  question_text: string;
  date: Date;
  question: QuestionType;
};

const QuestionCard = ({ question_text, date, question }: QuestionCardProps) => {
  const [errorMessage, setErrorMessage] = useState("");

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
        window.location.reload();
      }
    } catch (err: any) {
      const message = err?.response?.data?.message;

      if (typeof message === "string") {
        setErrorMessage(message);
      } else {
        setErrorMessage("An error occurred while deleting the question.");
        console.error(err);
      }
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.date}>{date.toLocaleString()}</div>
      </div>
      <div className={styles.body}>
        <p className={styles.question}>{question_text}</p>
      </div>
      <div className={styles.actions}>
        <Button title="Delete" type="DANGER" onClick={onDeleteQuestion} />
      </div>
      <div>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </div>

      <AnswerList questionId={question.id} />
    </div>
  );
};

export default QuestionCard;
