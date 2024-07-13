import { FaqsScreenContent } from './FaqsScreenContent';
import { FaqsScreenStore } from './FaqsScreenStore';

const FaqsScreen = () => {
  return (
    <FaqsScreenStore>
      <FaqsScreenContent />
    </FaqsScreenStore>
  );
};

export default FaqsScreen;
