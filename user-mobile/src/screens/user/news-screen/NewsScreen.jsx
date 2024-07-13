import { NewsScreenContent } from "./NewsScreenContent";
import { NewScreenStore } from "./NewsScreenStore";

const NewsScreen = () => {
  return (
    <NewScreenStore>
      <NewsScreenContent />
    </NewScreenStore>
  );
};

export default NewsScreen;
