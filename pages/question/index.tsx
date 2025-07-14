import PageTemplate from "@/components/PageTemplate/PageTemplate";
import QuestionForm from "@/components/QuestionForm/QuestionForm";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

const QuestionPage = () => {
  const router = useRouter();

  useEffect(() => {
    const jwtToken = Cookie.get("Forum-user-jwt-token");
    if (!jwtToken) {
      router.push("/login");
    }
  }, [router]);

  return (
    <PageTemplate>
      <QuestionForm />
    </PageTemplate>
  );
};
export default QuestionPage;
