import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { DataContext } from '../store';

export const CounsellorRoute = () => {
  const { user } = useContext(DataContext);

  return user.role === 'COUNSELLOR' ? <Outlet></Outlet> : <h1>403 forbiden</h1>;
};
