import React, { createContext, useEffect, useState } from "react";
import { initParams } from "./constance";
import { counsellorGetQUestionsSv } from "../../../service/cousellor/counsellorQuestion";
export const CounsellorQuestionContext = createContext({
  loading: Boolean,
  setLoading: Function,
  question: Array,
  setQuestion: Function,
  params: Object,
  setParams: Function,
  pages: Number,
  setPages: Function,
  showDetailModal: Boolean,
  setShowDetailModal: Function,
  selectedQuestion: Boolean,
  setSelectedQuestion: Function,
  showAnswerModal: Boolean,
  setShowAnswerModal: Function,
  showForwardModal: Boolean,
  setShowForwardModal: Function,
});

export const CounsellorQuestionProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState([]);
  const [params, setParams] = useState(initParams);
  const [pages, setPages] = useState(0);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [showForwardModal, setShowForwardModal] = useState(false);

  const getQuestions = async () => {
    if (loading) return;
    setLoading(true);
    setQuestion([]);
    try {
      const response = await counsellorGetQUestionsSv(params);
      setQuestion(response?.questions);
      setPages(response?.pages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuestions();
  }, [params]);

  return (
    <CounsellorQuestionContext.Provider
      value={{
        loading,
        setLoading,
        question,
        setQuestion,
        params,
        setParams,
        pages,
        setPages,
        showDetailModal,
        setShowDetailModal,
        selectedQuestion,
        setSelectedQuestion,
        showAnswerModal,
        setShowAnswerModal,
        showForwardModal,
        setShowForwardModal,
      }}
    >
      {children}
    </CounsellorQuestionContext.Provider>
  );
};
