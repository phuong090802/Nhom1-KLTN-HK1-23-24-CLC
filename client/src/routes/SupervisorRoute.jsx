import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { DataContext } from '../store';

export const SupervisorRoute = () => {
  const { user } = useContext(DataContext);

  return user.role === 'SUPERVISOR' ? <Outlet></Outlet> : <h1>403 forbiden</h1>;
};
