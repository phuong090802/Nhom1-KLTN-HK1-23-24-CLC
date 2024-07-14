import { DepheadCounsellorContent } from './DepheadCounsellorContent';
import { DepheadCounsellorStore } from './DepheadCounsellorStore';

const DepheadStaff = () => {
  return (
    <DepheadCounsellorStore>
      <DepheadCounsellorContent />
    </DepheadCounsellorStore>
  );
};

export default DepheadStaff;
