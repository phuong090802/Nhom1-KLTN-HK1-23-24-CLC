import React from "react";
import { DepheadAproveProvider } from "./DepheadAproveProvider";
import { DepheadAproveContent } from "./DepheadAproveContent";

const DepheadAprove = () => {
  return (
    <DepheadAproveProvider>
      <DepheadAproveContent />
    </DepheadAproveProvider>
  );
};

export default DepheadAprove;
