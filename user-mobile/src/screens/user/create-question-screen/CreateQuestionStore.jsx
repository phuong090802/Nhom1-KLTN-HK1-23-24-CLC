import { createContext, useState } from "react";

export const CreateQuestionContext = createContext({
  depData: [],
  setDepData: (depData) => {},
});

const CreateQuestionStore = ({ children }) => {
  const [depData, setDepData] = useState([]);
  const [fieldData, setFieldData] = useState([]);

  return (
    <CreateQuestionContext.Provider
      value={{
        depData,
        setDepData,
        fieldData,
        setFieldData,
      }}
    >
      {children}
    </CreateQuestionContext.Provider>
  );
};

export default CreateQuestionStore;
