import { createContext, useEffect, useState } from "react";
import { initParams } from "./constance";
import { depheadGetWaitingAnswesSv } from "../../../service/dephead/depheadAprove.sv";

export const DepheadAproveContext = createContext({
  answers: Array,
  setAnswer: Function,
  loading: Boolean,
  setLoading: Function,
  params: Object,
  setParams: Function,
  pages: Number,
  setPages: Function,
  showDetailModal: Boolean,
  setShowDetailModal: Function,
  selectedAnswer: Object,
  setSelectedAnswer: Function,
  getAnswers: Function,
});
export const DepheadAproveProvider = ({ children }) => {
  const [answers, setAnswer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState(initParams);
  const [pages, setPages] = useState(0);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState({});

  const getAnswers = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await depheadGetWaitingAnswesSv(params);
      setAnswer(response.questions);
      setPages(response.pages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnswers();
  }, [params]);

  return (
    <DepheadAproveContext.Provider
      value={{
        answers,
        setAnswer,
        loading,
        setLoading,
        params,
        setParams,
        pages,
        setPages,
        showDetailModal,
        setShowDetailModal,
        selectedAnswer,
        setSelectedAnswer,
        getAnswers,
      }}
    >
      {children}
    </DepheadAproveContext.Provider>
  );
};
