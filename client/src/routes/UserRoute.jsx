import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { DataContext } from '../store';

export const UserRoute = () => {
  const { user } = useContext(DataContext);

  return user.role ? <Outlet></Outlet> : <h1>403 forbiden</h1>;
};
