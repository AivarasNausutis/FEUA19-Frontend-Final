import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import QuestionList from "@/components/QuestionList/QuestionList";

export default function Home() {
  const router = useRouter();

  return (
    <PageTemplate>
      <QuestionList />
    </PageTemplate>
  );
}
