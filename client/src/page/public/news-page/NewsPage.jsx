import { NewsPageContent } from "./NewsPageContent";
import { NewsPageStore } from "./NewsPageStore";

const NewsPage = () => {
  return (
    <NewsPageStore>
      <NewsPageContent />
    </NewsPageStore>
  );
};

export default NewsPage;
