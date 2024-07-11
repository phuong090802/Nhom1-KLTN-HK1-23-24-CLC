import React from "react";
import { DashboardProvider } from "./DashboardProvider";
import { DashboardScreen } from "./DashboardScreen";
import DepModal from "../../admin/statistic/department-statistic/DepModal";

const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardScreen />
    </DashboardProvider>
  );
};

export default Dashboard;
