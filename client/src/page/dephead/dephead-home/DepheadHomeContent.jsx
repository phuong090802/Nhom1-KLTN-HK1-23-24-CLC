import React from "react";
import { Dashboard } from "./Dashboard";
import { Chart } from "./Chart";
import { FieldStatisticModal } from "./FieldStatisticModal";

export const DepheadHomeContent = () => {
  return (
    <div>
      <FieldStatisticModal />
      <Dashboard />
      <Chart />
    </div>
  );
};
