import React from "react";
import { Text } from "react-native";
import { DepheadFaqProvider } from "./DepheadFaqProvider";
import { DepheadFaqContent } from "./DepheadFaqContent";

const DepheadFaq = () => {
  return (
    <DepheadFaqProvider>
      <DepheadFaqContent />
    </DepheadFaqProvider>
  );
};

export default DepheadFaq;
