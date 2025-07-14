import React from "react";
import styles from "./styles.module.css";
import Button from "../Button/Button";
import { postQuestion } from "../../api/question";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useState } from "react";

const QuestionForm = () => {
  const router = useRouter();

  const [question_text, setQuestion_text] = useState<string>();

  const onSubmit = async () => {
    try {
      const jwt_token = Cookies.get("Forum-user-jwt-token");

      const response = await postQuestion({
        jwt_token: jwt_token!,
        question: { question_text },
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Question created successfully");

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        console.log("Question creation failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h4 className={styles.title}>
          Have a question? Feel free to type it below
        </h4>
        <textarea
          className={styles.textarea}
          placeholder="Type your question here..."
          rows={7}
          value={question_text}
          onChange={(e) => {
            setQuestion_text(e.target.value);
          }}
        />
        <Button title="Submit a question" onClick={onSubmit} />
      </div>
    </div>
  );
};

export default QuestionForm;
