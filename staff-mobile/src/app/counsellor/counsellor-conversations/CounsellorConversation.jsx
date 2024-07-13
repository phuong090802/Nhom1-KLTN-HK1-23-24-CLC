import { CounsellorConversationProvider } from './CounsellorConversationProvider';
import { CounsellorConversationContent } from './CounsellorConversationContent';

const CounsellorConversation = () => {
  return (
    <CounsellorConversationProvider>
      <CounsellorConversationContent />
    </CounsellorConversationProvider>
  );
};

export default CounsellorConversation;
