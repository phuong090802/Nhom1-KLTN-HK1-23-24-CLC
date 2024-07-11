import React from "react";
import { DepartmentStatisticProvider } from "./DepartmentStatisticProvider";
import { DepartmentStatisticScreen } from "./DepartmentStatisticScreen";

const DepartmentStatistic = () => {
  return (
    <DepartmentStatisticProvider>
      <DepartmentStatisticScreen />
    </DepartmentStatisticProvider>
  );
};

export default DepartmentStatistic;
