import { createContext, useState } from "react";

import { initParams } from "./const";

export const HomeContext = createContext({
  selected: -1,
  setSelected: (id) => {},
  questions: [],
  setQuestions: (questions) => {},
  params: initParams,
  setParams: (params) => {},
  pages: 0,
  setPages: (page) => {},
  showingModal: [],
  setShowingModal: () => {},
});

const HomeStore = ({ children }) => {
  const [selected, setSelected] = useState(-1);
  const [questions, setQuestions] = useState([]);
  const [params, setParams] = useState(initParams);
  const [showingModal, setShowingModal] = useState([]);

  const [pages, setPages] = useState(0);

  const value = {
    params,
    setParams,
    questions,
    setQuestions,
    params,
    setParams,
    selected,
    setSelected,
    pages,
    setPages,
    showingModal,
    setShowingModal,
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export default HomeStore;
