import React from "react";
import { DepheadCounsellorStore } from "./DepheadCounsellorStore";
import { DepheadCounsellorContent } from "./DepheadCounsellorContent";

const DepheadStaff = () => {
  return (
    <DepheadCounsellorStore>
      <DepheadCounsellorContent />
    </DepheadCounsellorStore>
  );
};

export default DepheadStaff;
