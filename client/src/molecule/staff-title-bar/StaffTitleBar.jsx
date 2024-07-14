import clsx from 'clsx';
import { CirclePlus, ListFilter } from 'lucide-react';
import { useCallback, useContext } from 'react';
import MyButton from '../../atom/my-button';
import Search from '../../atom/search/Search';
import { colors, darkModeCss } from '../../constance';
import { DataContext } from '../../store';

const StaffTitleBar = ({ title, setParams, onSearchFilter, onAdd }) => {
  const handleSortFilter = useCallback(() => {
    if (onSearchFilter) onSearchFilter();
  }, [onSearchFilter]);

  const { darkMode } = useContext(DataContext);
  const handleAdd = useCallback(() => {
    if (onAdd) onAdd();
  }, [onAdd]);

  return (
    <div
      className={clsx(
        'h-12 rounded-2xl px-4 text-black75 flex justify-between items-center shadow-black50 shadow-lg',
        darkMode ? darkModeCss : 'bg-gray-100'
      )}
    >
      <h1 className=" text-lg font-bold ">{title || 'Tiêu đề'}</h1>
      <div className="flex items-center justify-center gap-2">
        <div>
          <ListFilter
            color={darkMode ? '#fff' : colors.black75}
            onClick={handleSortFilter}
            className="cursor-pointer"
          />
        </div>
        <Search
          inputStyle={'bg-white border border-black-10'}
          setParams={setParams}
        />
        {onAdd && (
          <MyButton
            size={'icon'}
            variant={'outline'}
            className=" hover:before:bg-success/25 over:before:border-success relative overflow-hidden border-2 border-success bg-success/5 px-3 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-success/25 before:transition-all before:duration-500 hover:text-white hover:shadow-success hover:before:left-0 hover:before:w-full"
            onClick={handleAdd}
          >
            <CirclePlus color={colors.success} />
          </MyButton>
        )}
      </div>
    </div>
  );
};
export default StaffTitleBar;
