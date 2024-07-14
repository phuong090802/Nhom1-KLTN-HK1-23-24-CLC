import { Dashboard } from './Dashboard';
import { DepartmentStatisticModal } from './DepartmentStatisticModal';
import { QuestionChart } from './QuestionChart';

export const AdminHomeContent = () => {
  return (
    <div>
      <DepartmentStatisticModal />
      <Dashboard />
      <QuestionChart />
    </div>
  );
};
