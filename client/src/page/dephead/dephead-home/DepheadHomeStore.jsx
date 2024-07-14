import React, { createContext, useEffect, useState } from "react";
import {
  depheadGetFaqsCountSv,
  depheadGetFieldStatistic,
  depheadGetQuestionStatisticSv,
  depheadGetUserCountSv,
} from "../../../service/dephead/depheadStatistic.sv";
import { getMonth } from "../../../util/convert.util";

export const DepheadHomeContext = createContext({
  dashboardData: Object,
  chartData: Object,
  fieldSatisticData: Array,
  showingModals: Array,
  setShowingModals: Function,
});

export const DepheadHomeStore = ({ children }) => {
  const [dashboardData, setDashboardData] = useState({});

  const [showingModals, setShowingModals] = useState([]);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [fieldSatisticData, setFieldStatisticData] = useState([]);

  const getFieldStatistic = async () => {
    try {
      const response = await depheadGetFieldStatistic();
      setFieldStatisticData(response.fieldStatistic);
    } catch (error) {
      console.log(error);
    }
  };

  const getCounsellorCount = async () => {
    try {
      const response = await depheadGetUserCountSv();
      setDashboardData((prev) => ({
        ...prev,
        countOfUsers: response.countOfUsers,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const getFaqCount = async () => {
    try {
      const response = await depheadGetFaqsCountSv();
      setDashboardData((prev) => ({
        ...prev,
        countOfFAQs: response.countOfFAQs,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const getQuestionStatistic = async () => {
    try {
      const response = await depheadGetQuestionStatisticSv({
        timeUnit: "month", //year
        latestTime: 2,
      });

      const tempData = {
        labels: response?.departmentStatistic?.map(
          (statistic) => `Tháng ${getMonth(statistic?.date?.end)}`
        ),
        datasets: [
          {
            label: "Câu hỏi đã trả lời",
            data: response?.departmentStatistic?.map(
              (statistic) => statistic?.countOfAnsweredQuestions
            ),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: "Câu hỏi chưa trả lời",
            data: response?.departmentStatistic?.map(
              (statistic) =>
                statistic?.countOfQuestions -
                statistic?.countOfAnsweredQuestions
            ),
            backgroundColor: "rgba(75, 192, 192, 0.5)",
          },
        ],
      };
      setChartData(tempData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCounsellorCount();
    getFaqCount();
    getQuestionStatistic();
    getFieldStatistic();
  }, []);

  return (
    <DepheadHomeContext.Provider
      value={{
        dashboardData,
        chartData,
        fieldSatisticData,
        showingModals,
        setShowingModals,
      }}
    >
      {children}
    </DepheadHomeContext.Provider>
  );
};
