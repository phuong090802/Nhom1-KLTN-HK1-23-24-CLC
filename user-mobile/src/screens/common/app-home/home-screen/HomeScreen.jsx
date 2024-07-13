import HomeContent from './HomeContent';
import HomeStore from './HomeStore';

const HomeScreen = () => {
  return (
    <HomeStore>
      <HomeContent />
    </HomeStore>
  );
};

export default HomeScreen;
