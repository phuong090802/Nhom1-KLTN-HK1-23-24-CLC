import clsx from 'clsx';
import { CircleX } from 'lucide-react';
import { useContext } from 'react';
import { DataContext } from '../../store';
import { getRoleName } from '../../util/user.util';

const ModalLayout = ({ children, hidden, title, onClose }) => {
  const { user } = useContext(DataContext);
  return (
    <div
      className={clsx(
        'fixed top-0 right-0 left-0 bottom-0 bg-black10 backdrop-blur-sm z-10 flex justify-center items-center',
        hidden && 'hidden'
      )}
    >
      <div className="bg-white p-4 rounded-2xl min-w-52">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-primary border-b border-primary">
              {getRoleName(user.role)}
            </p>
            <p className="font-semibold text-black75 text-sm">
              {title || 'Không có tiêu đề'}
            </p>
          </div>
          <CircleX
            color={'#fff'}
            className="cursor-pointer bg-primary hover:bg-primary/75 rounded-full"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
};
export default ModalLayout;
