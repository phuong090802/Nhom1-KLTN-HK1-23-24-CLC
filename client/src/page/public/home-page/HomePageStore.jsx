import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { getQuestionsSv } from "../../../service/public/question.sv";
import { toast } from "sonner";
import { initParams } from "./constance";
export const HomePageContext = createContext({
  questions: Array,
  setQuestions: Function,
  selected: String,
  setSelected: Function,
  params: Object,
  setParams: Function,
  pages: Number,
  setPages: Function,
  hiddenCreateQuestion: Boolean,
  setHiddenCreateQuestion: Function,
});

export const HomePageStore = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  const [selected, setSelected] = useState("");

  const [params, setParams] = useState(initParams);

  const [pages, setPages] = useState(0);

  const [hiddenCreateQuestion, setHiddenCreateQuestion] = useState(true);

  const getQuestions = async () => {
    try {
      const response = await getQuestionsSv(params);
      setQuestions(response.questions);
      setPages(response.pages);
    } catch (error) {
      toast.warning(error.message || "Lỗi khi tải trang chủ");
    }
  };

  useEffect(() => {
    getQuestions();
  }, [params]);

  return (
    <HomePageContext.Provider
      value={{
        questions,
        setQuestions,
        selected,
        setSelected,
        pages,
        setPages,
        params,
        setParams,
        hiddenCreateQuestion,
        setHiddenCreateQuestion,
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
};
