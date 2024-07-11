import React from "react";
import { Dashboard } from "./Dashboard";
import { QuestionChart } from "./QuestionChart";
import { DepartmentStatisticModal } from "./DepartmentStatisticModal";

export const AdminHomeContent = () => {
  return (
    <div>
      <DepartmentStatisticModal />
      <Dashboard />
      <QuestionChart />
    </div>
  );
};
