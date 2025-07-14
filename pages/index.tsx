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

  useEffect(() => {
    const fetchAllQuestions = async () => {
      try {
        const jwtToken = Cookie.get("Forum-user-jwt-token");
        const result = await getAllQuestions({ jwt_token: jwtToken! });
        const questions = result.data.questions;
        setQuestions(questions);
      } catch (err: unknown) {
        console.log(err);
        if (
          typeof err === "object" &&
          err !== null &&
          "status" in err &&
          typeof (err as { status?: number }).status === "number" &&
          (err as { status: number }).status === 401
        ) {
          router.push("/login");
        }
      }
    };
    fetchAllQuestions();
  }, [router]);

  return (
    <PageTemplate>
      <QuestionList questions={questions} />
    </PageTemplate>
  );
}
