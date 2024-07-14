import { DepheadAnswerContent } from './DepheadAnswerContent';
import { DepheadAnswerStore } from './DepheadAnswerStore';

const DepheadAnswer = () => {
  return (
    <DepheadAnswerStore>
      <DepheadAnswerContent />
    </DepheadAnswerStore>
  );
};

export default DepheadAnswer;
