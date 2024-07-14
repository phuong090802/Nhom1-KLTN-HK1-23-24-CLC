import { DepheadFaqContent } from './DepheadFaqContent';
import { DepheadFaqStore } from './DepheadFaqStore';

const DepheadFaq = () => {
  return (
    <DepheadFaqStore>
      <DepheadFaqContent />
    </DepheadFaqStore>
  );
};

export default DepheadFaq;
