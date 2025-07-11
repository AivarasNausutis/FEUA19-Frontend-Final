import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { QuestionType } from "@/types/Question";
import QuestionDetails from "@/components/QuestionDetails/QuestionDetails";
import { useRouter } from "next/router";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { GetQuestionById } from "@/api/question";

const QuestionPage = () => {
  const [question, setQuestion] = useState<QuestionType | null>(null);

  const router = useRouter();

  const id = router.query.id as string;

  const fetchQuestion = async (id: string) => {
    try {
      const jwt_token = Cookie.get("Forum-user-jwt-token");
      const response = await GetQuestionById({ id: id, jwt_token: jwt_token! });

      setQuestion(response.data.question);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchQuestion(id);
    }
  }, [id]);

  return (
    <PageTemplate>
      <QuestionDetails question={question} />
    </PageTemplate>
  );
};

export default QuestionPage;
