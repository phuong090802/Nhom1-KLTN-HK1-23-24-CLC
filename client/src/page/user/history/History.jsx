import { HistoryContent } from './HistoryContent';
import { HistoryStore } from './HistoryStore';

const History = () => {
  return (
    <HistoryStore>
      <HistoryContent />
    </HistoryStore>
  );
};

export default History;
