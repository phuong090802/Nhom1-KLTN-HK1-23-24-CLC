import { createContext, useEffect, useState } from 'react';
import { depheadGetWaitingAnswesSv } from '../../../service/dephead/depheadAprove.sv';
import { initParams } from './constance';

export const DepheadAproveContext = createContext({
  answers: [],
  setAnswer: (answers) => {},
  loading: false,
  setLoading: (isLoading) => {},
  params: {},
  setParams: (params) => {},
  pages: 0,
  setPages: (pages) => {},
  showDetailModal: false,
  setShowDetailModal: (isShowDetailModal) => {},
  selectedAnswer: {},
  setSelectedAnswer: (answers) => {},
  getAnswers: () => {},
});
export const DepheadAproveProvider = ({ children }) => {
  const [answers, setAnswer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState(initParams);
  const [pages, setPages] = useState(0);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState({});

  const getAnswers = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await depheadGetWaitingAnswesSv(params);
      setAnswer(response.questions);
      setPages(response.pages);
    } catch (error) {
      console.log('getAnswers', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAnswers();
  }, [params]);

  const values = {
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
  };

  return (
    <DepheadAproveContext.Provider value={values}>
      {children}
    </DepheadAproveContext.Provider>
  );
};
