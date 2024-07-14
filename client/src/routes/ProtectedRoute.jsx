import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import StaffLayout from '../layout/staff-layout';
import { DataContext } from '../store';

export const ProtectedRoute = () => {
  const { user } = useContext(DataContext);

  const staffList = [
    'USER',
    'COUNSELLOR',
    'DEPARTMENT_HEAD',
    'SUPERVISOR',
    'ADMIN',
  ];

  return staffList.includes(user.role) ? (
    <StaffLayout>
      <Outlet />
    </StaffLayout>
  ) : (
    <h1>403 forbiden</h1>
  );
};
