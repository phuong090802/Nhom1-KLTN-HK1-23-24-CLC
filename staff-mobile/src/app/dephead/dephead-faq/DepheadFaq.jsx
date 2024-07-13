import { DepheadFaqContent } from './DepheadFaqContent';
import { DepheadFaqProvider } from './DepheadFaqProvider';

const DepheadFaq = () => {
  return (
    <DepheadFaqProvider>
      <DepheadFaqContent />
    </DepheadFaqProvider>
  );
};

export default DepheadFaq;
