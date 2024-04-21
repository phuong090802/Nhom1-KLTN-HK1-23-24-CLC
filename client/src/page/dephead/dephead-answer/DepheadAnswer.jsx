import React from "react";
import { DepheadAnswerStore } from "./DepheadAnswerStore";
import { DepheadAnswerContent } from "./DepheadAnswerContent";

const DepheadAnswer = () => {
  return (
    <DepheadAnswerStore>
      <DepheadAnswerContent />
    </DepheadAnswerStore>
  );
};

export default DepheadAnswer;
