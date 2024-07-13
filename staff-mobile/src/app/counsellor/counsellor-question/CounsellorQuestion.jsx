import { CounsellorQuestionContent } from "./CounsellorQuestionContent";
import { CounsellorQuestionProvider } from "./CounsellorQuestionProvider";

const CounsellorQuestion = () => {
  return (
    <CounsellorQuestionProvider>
      <CounsellorQuestionContent />
    </CounsellorQuestionProvider>
  );
};

export default CounsellorQuestion;
