import React from "react";
import { CounsellorQuestionProvider } from "./CounsellorQuestionProvider";
import { CounsellorQuestionContent } from "./CounsellorQuestionContent";

const CounsellorQuestion = () => {
  return (
    <CounsellorQuestionProvider>
      <CounsellorQuestionContent />
    </CounsellorQuestionProvider>
  );
};

export default CounsellorQuestion;
