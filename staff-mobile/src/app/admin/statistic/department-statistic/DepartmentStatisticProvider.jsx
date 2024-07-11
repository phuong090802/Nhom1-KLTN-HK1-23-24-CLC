import React, { createContext, useEffect, useState } from "react";
import {
  getDepStatisticById,
  getDepStatisticsSv,
} from "../../../../service/admin/depStatictis.sv";
import { getMonth } from "../../../../util/convert.util";
import { colors } from "../../../../../constance";

export const DepartmentStatisticContext = createContext({
  depStatictis: Array,
  setDepStatictis: Function,
  chosenDep: { departmentName: "", _id: "" },
  setChosenDep: Function,
  visibleDepModal: Boolean,
  setVisibleDepModal: Function,
  chartData: Object | null,
  loading: Boolean,
});

export const DepartmentStatisticProvider = ({ children }) => {
  const [depStatictis, setDepStatictis] = useState([]);

  const [chosenDep, setChosenDep] = useState({ departmentName: "", _id: "" });

  const [visibleDepModal, setVisibleDepModal] = useState(false);

  const [chartData, setChartData] = useState(null);

  const [loading, setLoading] = useState(false);

  const getDepStatistics = async () => {
    try {
      const response = await getDepStatisticsSv();
      setDepStatictis(response.departmentStatistics);
    } catch (error) {
      console.log(error);
    }
  };

  const getChosenDepStatistic = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await getDepStatisticById(chosenDep._id);
      const labels = response.departmentStatistic.map(
        (data) => `T. ${getMonth(data.date.start)}`
      );
      const data = response.departmentStatistic.map((data) => [
        data.countOfQuestions - data.countOfAnsweredQuestions,
        data.countOfAnsweredQuestions,
      ]);
      const tranformedData = {
        labels,
        legend: ["Waiting question", "Answerd Question"],
        data: data,
        barColors: [colors.primary, "#ced6e0"],
      };
      setChartData(tranformedData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDepStatistics();
  }, []);
  useEffect(() => {
    if (chosenDep._id) getChosenDepStatistic();
  }, [chosenDep]);
  return (
    <DepartmentStatisticContext.Provider
      value={{
        depStatictis,
        setDepStatictis,
        chosenDep,
        setChosenDep,
        visibleDepModal,
        setVisibleDepModal,
        chartData,
        loading,
      }}
    >
      {children}
    </DepartmentStatisticContext.Provider>
  );
};
