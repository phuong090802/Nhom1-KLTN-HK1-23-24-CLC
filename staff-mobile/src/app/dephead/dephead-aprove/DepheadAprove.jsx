import { DepheadAproveContent } from './DepheadAproveContent';
import { DepheadAproveProvider } from './DepheadAproveProvider';

const DepheadAprove = () => {
  return (
    <DepheadAproveProvider>
      <DepheadAproveContent />
    </DepheadAproveProvider>
  );
};

export default DepheadAprove;
