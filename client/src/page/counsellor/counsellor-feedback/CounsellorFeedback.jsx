import React from "react";
import { CounsellorFeedbackStore } from "./CounsellorFeedbackStore";
import { CounsellorFeedbackContent } from "./CounsellorFeedbackContent";

const CounsellorFeedback = () => {
  return (
    <CounsellorFeedbackStore>
      <CounsellorFeedbackContent />
    </CounsellorFeedbackStore>
  );
};

export default CounsellorFeedback;
