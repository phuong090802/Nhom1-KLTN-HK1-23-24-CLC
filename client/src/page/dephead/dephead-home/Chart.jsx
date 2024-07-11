import React, { useContext, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { DepheadHomeContext } from "./DepheadHomeStore";
import { DataContext } from "../../../store";
import clsx from "clsx";
import { darkModeCss } from "../../../constance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Câu hỏi của khoa",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};
export const Chart = () => {
  const { chartData } = useContext(DepheadHomeContext);

  const { darkMode } = useContext(DataContext);

  const ChartComponent = useMemo(() => {
    return (
      <div className="h-[50vh]">
        <Bar options={options} data={chartData} />
      </div>
    );
  }, [chartData]);

  return (
    <div
      className={clsx(
        "shadow-lg border mt-4 shadow-black50 rounded-xl py-8 px-16",
        darkMode && darkModeCss
      )}
    >
      {ChartComponent}
    </div>
  );
};
