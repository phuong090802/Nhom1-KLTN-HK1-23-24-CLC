import { FaqsScreenContent } from "./FaqsScreenContent";
import { FaqsScreenStore, FaqsStoreContext } from "./FaqsScreenStore";

const FaqsScreen = () => {
  return (
    <FaqsScreenStore>
      <FaqsScreenContent />
    </FaqsScreenStore>
  );
};

export default FaqsScreen;
