import { CounsellorFeedbackContent } from './CounsellorFeedbackContent';
import { CounsellorFeedbackStore } from './CounsellorFeedbackStore';

const CounsellorFeedback = () => {
  return (
    <CounsellorFeedbackStore>
      <CounsellorFeedbackContent />
    </CounsellorFeedbackStore>
  );
};

export default CounsellorFeedback;
