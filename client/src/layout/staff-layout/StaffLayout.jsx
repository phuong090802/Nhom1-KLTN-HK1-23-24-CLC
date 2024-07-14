import clsx from 'clsx';
import { useContext } from 'react';
import { DataContext } from '../../store';
import { StaffMenu } from './StaffMenu';

const StaffLayout = ({ children }) => {
  const { darkMode } = useContext(DataContext);
  return (
    <div className={clsx('grid grid-cols-4 p-2 gap-2', darkMode && 'bg-black')}>
      <div className="flex flex-col gap-1">
        <StaffMenu />
      </div>
      <div className="col-span-3">{children}</div>
    </div>
  );
};

export default StaffLayout;
