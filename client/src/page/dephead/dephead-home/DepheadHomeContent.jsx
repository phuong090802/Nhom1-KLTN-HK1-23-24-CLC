import { Chart } from './Chart';
import { CounsellorRankingModal } from './CounsellorRankingModal';
import { Dashboard } from './Dashboard';
import { FieldStatisticModal } from './FieldStatisticModal';
import { OverDueQuestionModal } from './OverDueQuestionModal';

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
