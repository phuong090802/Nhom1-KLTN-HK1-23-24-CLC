import { createContext, useEffect, useState } from 'react';
import {
  getDepartmentStatisticSv,
  getQuestionStatisticSv,
  getStatisticSv,
} from '../../../service/admin/adminStatistic';
import { getMonth } from '../../../util/convert.util';
import { depStatisticParams } from './constance';

export const AdminHomeContext = createContext({
  dashboardData: Object,
  questionChartData: Object,
  hiddenDepStatistic: Boolean,
  setHiddenDepStatistic: Function,
});

export const AdminHomeStore = ({ children }) => {
  const [dashboardData, setDashboardData] = useState({});

  const [hiddenDepStatistic, setHiddenDepStatistic] = useState(true);

  const [questionChartData, setQuestionChartData] = useState({
    labels: [],
    datasets: [],
  });

  const getSatistic = async () => {
    try {
      const response = await getStatisticSv();
      setDashboardData({
        countOfDepartments: response?.countOfDepartments,
        countOfFields: response?.countOfFields,
        countOfQuestions: response?.countOfQuestions,
        countOfUsers: response?.countOfUsers,
      });
    } catch (error) {
      console.log('getSatistic', error);
    }
  };

  const getQuestionStatistic = async () => {
    try {
      const response = await getQuestionStatisticSv({
        timeUnit: 'month',
        latestTime: 2,
      });
      const tempData = {
        labels: response?.questionStatistic?.map(
          (statistic) => `Tháng ${getMonth(statistic?.date?.end)}`
        ),
        datasets: [
          {
            label: 'Câu hỏi',
            data: response?.questionStatistic?.map(
              (statistic) => statistic?.countOfQuestions
            ),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
      setQuestionChartData(tempData);
    } catch (error) {
      console.log('getQuestionStatistic', error);
    }
  };

  const getDepStatistic = async () => {
    try {
      const response = await getDepartmentStatisticSv(depStatisticParams);
      console.log(response);
    } catch (error) {
      console.log('getDepStatistic', error);
    }
  };

  useEffect(() => {
    getSatistic();
    getQuestionStatistic();
    // getDepStatistic();
  }, []);

  return (
    <AdminHomeContext.Provider
      value={{
        dashboardData,
        questionChartData,
        hiddenDepStatistic,
        setHiddenDepStatistic,
      }}
    >
      {children}
    </AdminHomeContext.Provider>
  );
};
