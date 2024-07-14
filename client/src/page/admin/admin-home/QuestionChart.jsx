import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import clsx from 'clsx';
import { useContext, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { darkModeCss } from '../../../constance';
import { DataContext } from '../../../store';
import { AdminHomeContext } from './AdminHomeStore';

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Câu hỏi hệ thống đã nhận',
    },
  },
};

export const QuestionChart = () => {
  const { questionChartData } = useContext(AdminHomeContext);
  const { darkMode } = useContext(DataContext);

  const chartComponent = useMemo(() => {
    return (
      <div className="h-[50vh]">
        <Line options={options} data={questionChartData} />
      </div>
    );
  }, [questionChartData]);
  return (
    <div
      className={clsx(
        'shadow-lg border mt-8 shadow-black50 rounded-xl py-8 px-16 ',
        darkMode && darkModeCss
      )}
    >
      {chartComponent}
    </div>
  );
};
