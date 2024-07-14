import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { DataContext } from '../store';

export const DepartmentHeadRoute = () => {
  const { user } = useContext(DataContext);

  return user.role === 'DEPARTMENT_HEAD' ? (
    <Outlet></Outlet>
  ) : (
    <h1>403 forbiden</h1>
  );
};
