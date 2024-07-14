import { X } from 'lucide-react';
import { colors } from '../../constance';

const BottomModalLayout = ({ children, hidden, setHidden, title }) => {
  return (
    !hidden && (
      <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-end z-10 bg-black25">
        <div className="animate-slide-up bg-white min-w-[30rem] min-h-10 shadow-lg shadow-black50 rounded-t-lg border">
          <div className="flex justify-between items-center py-2 px-3 border-b">
            <h1 className="text-xl font-bold text-black75">{title || ''}</h1>
            <button
              onClick={() => setHidden(true)}
              className="hover:bg-black25 rounded-full"
            >
              <X color={colors.black75} />
            </button>
          </div>
          <div className="px-4 pb-2 max-h-[35rem] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    )
  );
};

export default BottomModalLayout;
