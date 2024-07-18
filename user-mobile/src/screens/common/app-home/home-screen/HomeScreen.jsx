import { HomeScreenContent } from "./HomeScreenContent";
import HomeStore from "./HomeStore";

const HomeScreen = () => {
  return (
    <HomeStore>
      {/* <HomeContent /> */}
      <HomeScreenContent />
    </HomeStore>
  );
};

export default HomeScreen;
