import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getQuesStatisticDataSv,
  getSystemStatictisSv,
} from "../../../service/admin/depStatictis.sv";
import { getMonth } from "../../../util/convert.util";
import { AppContext } from "../../AppProvider";
import {
  depheadGetCounsellorCount,
  depheadGetFaqCount,
  depheadGetQuestionStatistic,
} from "../../../service/dephead/depheadStatistic.sv";
import { counsellorGetQuestionStatistic } from "../../../service/cousellor/counsellorStatistic";

export const DashboardContext = createContext({
  chartData: Object,
  systemStatictis: Object,
});

export const DashboardProvider = ({ children }) => {
  const [chartData, setChartData] = useState(null);

  const [systemStatictis, setSystemStatictis] = useState({});

  const { isLoggedIn, user } = useContext(AppContext);

  const adminGetChartData = async () => {
    try {
      const response = await getQuesStatisticDataSv();
      const labels = response.questionStatistic.map(
        (data) => `T. ${getMonth(data.date.start)}`
      );
      const data = response.questionStatistic.map(
        (data) => data.countOfQuestions
      );
      const transformedData = {
        labels: labels,
        datasets: [
          {
            data: data,
          },
        ],
      };
      setChartData(transformedData);
    } catch (error) {
      console.log(error);
    }
  };

  const adminGetStatictis = async () => {
    try {
      const response = await getSystemStatictisSv();
      setSystemStatictis((prev) => ({
        ...prev,
        countOfDepartments: response.countOfDepartments,
        countOfFields: response.countOfFields,
        countOfQuestions: response.countOfQuestions,
        countOfUsers: response.countOfUsers,
      }));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const depheadGetChartData = async () => {
    try {
      const response = await depheadGetQuestionStatistic();
      const labels = response.departmentStatistic.map(
        (data) => `T. ${getMonth(data.date.start)}`
      );
      const data = response.departmentStatistic.map(
        (data) => data.countOfQuestions
      );
      const transformedData = {
        labels: labels,
        datasets: [
          {
            data: data,
          },
        ],
      };
      setChartData(transformedData);
    } catch (error) {
      console.log(error);
    }
  };

  const depheadGetStatistic = async () => {
    try {
      const { countOfFAQs } = await depheadGetFaqCount();
      const { countOfUsers } = await depheadGetCounsellorCount();
      setSystemStatictis({ countOfFAQs, countOfUsers });
    } catch (error) {
      console.log(error);
    }
  };

  const counsellorGetChartData = async () => {
    try {
      const response = await counsellorGetQuestionStatistic();
      console.log(response);
      const labels = response.questionsStatistic.map(
        (data) => `T. ${getMonth(data.date.start)}`
      );
      const data = response.questionsStatistic.map(
        (data) => data.countOfAnsweredQuestions
      );
      const transformedData = {
        labels: labels,
        datasets: [
          {
            data: data,
          },
        ],
      };
      setChartData(transformedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    switch (user.role) {
      case "ADMIN":
        adminGetChartData();
        adminGetStatictis();
        break;
      case "DEPARTMENT_HEAD":
        depheadGetChartData();
        depheadGetStatistic();
        break;
      case "COUNSELLOR":
        counsellorGetChartData();
        break;
      default:
        break;
    }
  }, [isLoggedIn]);

  return (
    <DashboardContext.Provider value={{ chartData, systemStatictis }}>
      {children}
    </DashboardContext.Provider>
  );
};
