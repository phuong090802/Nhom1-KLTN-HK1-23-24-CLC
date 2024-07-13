import { createContext, useState } from 'react';

import { initParams } from './const';

export const HomeContext = createContext({
  selected: -1,
  setSelected: (id) => {},
  questions: [],
  setQuestions: (questions) => {},
  params: initParams,
  setParams: (params) => {},
  searchVisible: false,
  setSearchVisible: (searchVisible) => {},
  sortVisible: false,
  setSortVisible: (sortVisible) => {},
  depData: [],
  setDepData: (depData) => {},
  fieldData: [],
  setFieldData: (fieldData) => {},
  chosenDep: null,
  setChosenDep: (chosenDep) => {},
  chosenField: null,
  setChosenField: (chosenField) => {},
  pages: 0,
  setPages: (page) => {},
});

const HomeStore = ({ children }) => {
  const [selected, setSelected] = useState(-1);
  const [questions, setQuestions] = useState([]);
  const [params, setParams] = useState(initParams);
  const [searchVisible, setSearchVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);

  const [depData, setDepData] = useState([]);
  const [fieldData, setFieldData] = useState([]);
  const [chosenDep, setChosenDep] = useState(null);
  const [chosenField, setChosenField] = useState(null);

  const [pages, setPages] = useState(0);

  const value = {
    params,
    setParams,
    questions,
    setQuestions,
    params,
    setParams,
    searchVisible,
    setSearchVisible,
    sortVisible,
    setSortVisible,
    depData,
    setDepData,
    fieldData,
    setFieldData,
    chosenDep,
    setChosenDep,
    chosenField,
    setChosenField,
    selected,
    setSelected,
    pages,
    setPages,
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export default HomeStore;
