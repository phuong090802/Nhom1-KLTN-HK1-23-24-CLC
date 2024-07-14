import { CounsellorQuestionContent } from './CounsellorQuestionContent';
import { CounsellorQuestionStore } from './CounsellorQuestionStore';

const CounsellorQuestion = () => {
  return (
    <CounsellorQuestionStore>
      <CounsellorQuestionContent />
    </CounsellorQuestionStore>
  );
};

export default CounsellorQuestion;
