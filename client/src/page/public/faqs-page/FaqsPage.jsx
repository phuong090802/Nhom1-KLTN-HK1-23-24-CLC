import { FaqsPageContent } from "./FaqsPageContent";
import { FaqsPageStore } from "./FaqsPageStore";

const FaqsPage = () => {
  return (
    <FaqsPageStore>
      <FaqsPageContent />
    </FaqsPageStore>
  );
};

export default FaqsPage;
