import { HomePageContent } from './HomePageContent';
import { HomePageStore } from './HomePageStore';

const HomePage = () => {
  return (
    <HomePageStore>
      <HomePageContent />
    </HomePageStore>
  );
};
export default HomePage;
