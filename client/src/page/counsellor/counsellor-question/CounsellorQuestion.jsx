import React from "react";
import { CounsellorQuestionStore } from "./CounsellorQuestionStore";
import { CounsellorQuestionContent } from "./CounsellorQuestionContent";

const CounsellorQuestion = () => {
  return (
    <CounsellorQuestionStore>
      <CounsellorQuestionContent />
    </CounsellorQuestionStore>
  );
};

export default CounsellorQuestion;
