import { createContext, useEffect, useState } from "react";
import { initParams } from "./constance";
import { counsellorGetQUestionsSv } from "../../../service/cousellor/counsellorQuestion";

export const CounsellorQuestionContext = createContext({
  loading: false,
  setLoading: (isLoading) => {},
  question: [],
  setQuestion: (questions) => {},
  params: {},
  setParams: (params) => {},
  pages: 0,
  setPages: (pages) => {},
  showDetailModal: false,
  setShowDetailModal: (isShowDetailModal) => {},
  selectedQuestion: {},
  setSelectedQuestion: (question) => {},
  showAnswerModal: false,
  setShowAnswerModal: (isShowAnswerModal) => {},
  showForwardModal: false,
  setShowForwardModal: (isShowForwardModal) => {},
  getQuestions: () => {},
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
    if (loading) {
      return;
    }
    setLoading(true);
    setQuestion([]);
    try {
      const response = await counsellorGetQUestionsSv(params);
      setQuestion(response?.questions);
      setPages(response?.pages);
    } catch (error) {
      console.log("getQuestions", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getQuestions();
  }, [params]);

  const values = {
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
    getQuestions,
  };

  return (
    <CounsellorQuestionContext.Provider value={values}>
      {children}
    </CounsellorQuestionContext.Provider>
  );
};
