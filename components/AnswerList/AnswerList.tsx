import React, { useEffect, useState } from "react";
import AnswerItem from "../AnswerItem/AnswerItem";
import { getAllAnswers, PostAnswer } from "@/api/answers";
import Cookie from "js-cookie";
import styles from "./styles.module.css";
import Button from "../Button/Button";

import { AnswerType } from "@/types/Answer";

type AnswerListProps = {
  questionId: string;
};

const AnswerList = ({ questionId }: AnswerListProps) => {
  const [answers, setAnswers] = useState<AnswerType[]>([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [answer_text, setAnswer_text] = useState<string>("");

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);
  useEffect(() => {
    const fetchAnswers = async () => {
      const jwt_token = Cookie.get("Forum-user-jwt-token");
      if (!jwt_token) {
        setErrorMessage("Not authenticated");

        return;
      }

      try {
        const response = await getAllAnswers({ id: questionId, jwt_token });
        setAnswers(response.data.answers || []);
      } catch (err: unknown) {
        console.error("Error fetching answers:", err);
        setErrorMessage("Failed to load answers");
      }
    };

    fetchAnswers();
  }, [questionId]);

  const onSubmit = async () => {
    if (!answer_text.trim()) {
      setErrorMessage("Please enter an answer");
    }

    try {
      const jwtToken = Cookie.get("Forum-user-jwt-token");

      const response = await PostAnswer({
        jwt_token: jwtToken!,
        id: questionId,
        answer: { answer_text: answer_text.trim() },
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Answer created successfully");
        setAnswer_text("");

        const updatedResponse = await getAllAnswers({
          id: questionId,
          jwt_token: jwtToken!,
        });
        setAnswers(updatedResponse.data.answers || []);
      }
    } catch (errorMessage) {
      console.log(errorMessage);
      setErrorMessage("Failed to post answer");
    }
  };

  return (
    <div className={styles.answerList}>
      <h4 className={styles.answerTitle}>Your answer</h4>
      <input
        type="text"
        className={styles.answerInput}
        value={answer_text}
        onChange={(e) => setAnswer_text(e.target.value)}
        placeholder="Type your answer here..."
      />
      <Button title={"Submit"} onClick={onSubmit} />
      <div>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </div>
      <h3 className={styles.answerTitle}>Answers ({answers.length})</h3>
      {answers.map((a) => (
        <AnswerItem
          key={a.id}
          id={a.id}
          answer_text={a.answer_text}
          date={a.date}
          gained_likes_number={a.gained_likes_number}
          question_id={a.question_id}
        />
      ))}
    </div>
  );
};

export default AnswerList;
