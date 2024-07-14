import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import clsx from 'clsx';
import { useContext, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { darkModeCss } from '../../../constance';
import { DataContext } from '../../../store';
import { DepheadHomeContext } from './DepheadHomeStore';

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
      text: 'Câu hỏi của khoa',
    },
  },
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
        'shadow-lg border mt-4 shadow-black50 rounded-xl py-8 px-16',
        darkMode && darkModeCss
      )}
    >
      {ChartComponent}
    </div>
  );
};
