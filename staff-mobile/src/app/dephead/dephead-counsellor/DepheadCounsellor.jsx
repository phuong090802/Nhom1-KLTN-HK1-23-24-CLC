import React from "react";
import { DepheadCounsellorContent } from "./DepheadCounsellorContent";
import { DepheadCounsellorProvider } from "./DepheadCounsellorProvider";

const DepheadCounsellor = () => {
  return (
    <DepheadCounsellorProvider>
      <DepheadCounsellorContent />
    </DepheadCounsellorProvider>
  );
};

export default DepheadCounsellor;
