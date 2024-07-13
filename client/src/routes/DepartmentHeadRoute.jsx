import { useContext } from 'react';
import { DataContext } from '../store';
import { Outlet } from 'react-router-dom';

export const DepartmentHeadRoute = () => {
  const { user } = useContext(DataContext);

  return user.role === 'DEPARTMENT_HEAD' ? (
    <Outlet></Outlet>
  ) : (
    <h1>403 forbiden</h1>
  );
};
