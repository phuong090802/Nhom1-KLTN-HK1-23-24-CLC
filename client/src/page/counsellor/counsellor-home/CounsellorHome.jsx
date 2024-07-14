import { CounsellorHomeContent } from './CounsellorHomeContent';
import { CounsellorHomeStore } from './CounsellorHomeStore';

const CounsellorHome = () => {
  return (
    <CounsellorHomeStore>
      <CounsellorHomeContent />
    </CounsellorHomeStore>
  );
};

export default CounsellorHome;
