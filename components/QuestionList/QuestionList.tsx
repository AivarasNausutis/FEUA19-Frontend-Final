import { QuestionType } from "../../types/Question";
import QuestionCard from "../QuestionCard/QuestionCard";
import styles from "./styles.module.css";

type QuestionListProps = {
  questions: QuestionType[];
};

const QuestionList = ({ questions }: QuestionListProps) => {
  return (
    <div className={styles.container}>
      {questions.map((q) => {
        return (
          <QuestionCard
            key={q.id}
            id={q.id}
            question_text={q.question_text}
            date={new Date(q.date)}
            question={q}
          />
        );
      })}
    </div>
  );
};

export default QuestionList;
