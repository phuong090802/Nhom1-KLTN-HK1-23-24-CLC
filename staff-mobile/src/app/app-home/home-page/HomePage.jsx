import { useContext } from 'react';
import { AppContext } from '../../AppProvider';
import { HomePageContent } from './HomePageContent';
import { HomePageProvider } from './HomePageProvider';

const HomePage = () => {
  const {} = useContext(AppContext);

  return (
    <HomePageProvider>
      <HomePageContent />
    </HomePageProvider>
  );
};

export default HomePage;
