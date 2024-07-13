import { createContext, useState } from 'react';

export const CreateQuestionContext = createContext({
  depData: [],
  setDepData: (depData) => {},
});

const CreateQuestionStore = ({ children }) => {
  const [depData, setDepData] = useState([]);
  const [fieldData, setFieldData] = useState([]);

  const values = {
    depData,
    setDepData,
    fieldData,
    setFieldData,
  };

  return (
    <CreateQuestionContext.Provider value={values}>
      {children}
    </CreateQuestionContext.Provider>
  );
};

export default CreateQuestionStore;
