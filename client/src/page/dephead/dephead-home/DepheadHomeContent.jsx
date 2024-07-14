import React from "react";
import { Dashboard } from "./Dashboard";
import { Chart } from "./Chart";
import { FieldStatisticModal } from "./FieldStatisticModal";
import { OverDueQuestionModal } from "./OverDueQuestionModal";
import { CounsellorRankingModal } from "./CounsellorRankingModal";

export const DepheadHomeContent = () => {
  return (
    <div>
      <FieldStatisticModal />
      <OverDueQuestionModal />
      <CounsellorRankingModal />
      <Dashboard />
      <Chart />
    </div>
  );
};
