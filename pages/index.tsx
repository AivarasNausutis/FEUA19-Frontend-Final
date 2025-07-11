import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { QuestionType } from "../types/Question";
import { getAllQuestions } from "@/api/question";
import QuestionList from "@/components/QuestionList/QuestionList";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { cleanupQuestionCounts } from "@/utils/localstorage";

export default function Home() {
  const router = useRouter();

  const [questions, setQuestions] = useState<QuestionType[]>([]);

  const fetchAllQuestions = async () => {
    try {
      const jwtToken = Cookie.get("Forum-user-jwt-token");

      const result = await getAllQuestions({ jwt_token: jwtToken! });
      const questions = result.data.questions;

      const questionIds = questions.map((q: QuestionType) => q.id);
      cleanupQuestionCounts(questionIds);

      setQuestions(questions);
    } catch (err: any) {
      console.log(err);

      if (err.status === 401) {
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  return (
    <PageTemplate>
      <QuestionList questions={questions} />
    </PageTemplate>
  );
}
