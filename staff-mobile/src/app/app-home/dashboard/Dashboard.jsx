import { DashboardProvider } from './DashboardProvider';
import { DashboardScreen } from './DashboardScreen';

const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardScreen />
    </DashboardProvider>
  );
};

export default Dashboard;
