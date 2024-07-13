import { createContext, useEffect, useState } from 'react';
import { getMyQuestionsSv } from '../../../services/guest/question.sv';

export const AskedQuestionContext = createContext({
  selected: String | Number,
  setSelected: Function,
});

export const AskedQuestionStore = ({ children }) => {
  const [selected, setSelected] = useState(-1);

  const getMyQuestions = async () => {
    console.log('getMyQuestions');
    try {
      const response = await getMyQuestionsSv();
      console.log('getMyQuestions', response);
    } catch (error) {
      console.log('getMyQuestions', error);
    }
  };

  useEffect(() => {
    getMyQuestions();
  }, []);
  return (
    <AskedQuestionContext.Provider value={{ selected, setSelected }}>
      {children}
    </AskedQuestionContext.Provider>
  );
};
