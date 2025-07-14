import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { AnswerType } from "@/types/Answer";
import Button from "../Button/Button";
import Cookie from "js-cookie";
import axios from "axios";
import { config } from "@/config";
import { getItem, setItem, removeItem } from "@/utils/localstorage";

const AnswerCard = ({
  id,
  answer_text,
  date,
  gained_likes_number,
}: AnswerType) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [likeCount, setLikeCount] = useState(() => {
    const stored = getItem(`answer_likes_${id}`);
    return (stored as number) || gained_likes_number;
  });

  useEffect(() => {
    setItem(`answer_likes_${id}`, likeCount);
  }, [likeCount, id]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleLike = () => setLikeCount((prev) => prev + 1);
  const handleDislike = () => setLikeCount((prev) => prev - 1);

  const onDeleteAnswer = async () => {
    try {
      const jwt_token = Cookie.get("Forum-user-jwt-token");

      const response = await axios.delete(`${config.BASE_URL}/answer/${id}`, {
        headers: {
          Authorization: jwt_token,
        },
      });

      if (response.status === 200) {
        removeItem(`answer_likes_${id}`);
        window.location.reload();
      }
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (
          err as { response?: { data?: { message?: string }; status?: number } }
        ).response === "object" &&
        (err as { response?: { data?: { message?: string }; status?: number } })
          .response !== null
      ) {
        const response = (
          err as { response: { data?: { message?: string }; status?: number } }
        ).response;
        if (response.data && typeof response.data.message === "string") {
          setErrorMessage(response.data.message);
        } else {
          setErrorMessage("An error occurred while deleting the answer.");
        }
      } else {
        setErrorMessage("An error occurred while deleting the answer.");
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.answerCard}>
      <div className={styles.answerHeader}>
        <div className={styles.date}>{new Date(date).toLocaleString()}</div>
      </div>
      <div className={styles.answerBody}>
        <p className={styles.answerText}>{answer_text}</p>
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
        <Button title="Delete" type="DANGER" onClick={onDeleteAnswer} />
      </div>
      <div>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default AnswerCard;
