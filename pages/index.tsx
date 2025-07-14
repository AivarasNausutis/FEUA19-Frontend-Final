import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { QuestionType } from "../types/Question";
import { getAllQuestions } from "@/api/question";
import QuestionList from "@/components/QuestionList/QuestionList";
import PageTemplate from "@/components/PageTemplate/PageTemplate";

export default function Home() {
  const router = useRouter();

  const [questions, setQuestions] = useState<QuestionType[]>([]);

  const fetchAllQuestions = async () => {
    try {
      const jwtToken = Cookie.get("Forum-user-jwt-token");

      const result = await getAllQuestions({ jwt_token: jwtToken! });
      const questions = result.data.questions;

      setQuestions(questions);
    } catch (err: unknown) {
      console.log(err);
      if (typeof err === "object" && err !== null && "status" in err) {
        if ((err as any).status === 401) {
          router.push("/login");
        }
      }
    }
  };

  useEffect(() => {
    fetchAllQuestions();
  }, [fetchAllQuestions]);

  return (
    <PageTemplate>
      <QuestionList questions={questions} />
    </PageTemplate>
  );
}
