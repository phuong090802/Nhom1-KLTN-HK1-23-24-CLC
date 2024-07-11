import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { getQuestionsSv } from "../../../service/public/question.sv";
import { toast } from "sonner";
import { initParams } from "./constance";
export const HomePageContext = createContext({
  questions: Array,
  setQuestions: Function,
  // selected: String,
  // setSelected: Function,
  params: Object,
  setParams: Function,
  pages: Number,
  setPages: Function,
  hiddenCreateQuestion: Boolean,
  setHiddenCreateQuestion: Function,
  file: Object,
  setFile: Function,
  hiddenDetailQuestionModal: Boolean,
  setHiddenDetailQuestionModal: Function,
  selectedData: Object,
  setSelectedData: Function,
});

export const HomePageStore = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  // const [selected, setSelected] = useState("");

  const [selectedData, setSelectedData] = useState(null);

  const [params, setParams] = useState(initParams);

  const [pages, setPages] = useState(0);

  const [hiddenCreateQuestion, setHiddenCreateQuestion] = useState(true);

  const [hiddenDetailQuestionModal, setHiddenDetailQuestionModal] =
    useState(true);

  const [file, setFile] = useState(null);

  const getQuestions = async () => {
    try {
      const response = await getQuestionsSv(params);
      setQuestions(response.questions);
      setPages(response.pages);
      // console.log(response);
    } catch (error) {
      console.log("error", error);
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
        // selected,
        // setSelected,
        pages,
        setPages,
        params,
        setParams,
        hiddenCreateQuestion,
        setHiddenCreateQuestion,
        file,
        setFile,
        hiddenDetailQuestionModal,
        setHiddenDetailQuestionModal,
        selectedData,
        setSelectedData,
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
};
