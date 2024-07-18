import { createContext, useEffect, useState } from "react";
import { getMyQuestionsSv } from "../../../services/guest/question.sv";
import { initParams } from "./const";

export const AskedQuestionContext = createContext({
  params: {},
  setParams: () => {},
});

export const AskedQuestionStore = ({ children }) => {
  const [params, setParams] = useState(initParams);

  return (
    <AskedQuestionContext.Provider value={{ params, setParams }}>
      {children}
    </AskedQuestionContext.Provider>
  );
};
