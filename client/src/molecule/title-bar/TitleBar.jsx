import clsx from 'clsx';
import { useContext } from 'react';
import Search from '../../atom/search';
import { darkModeCss } from '../../constance';
import { DataContext } from '../../store';
import { SortFilter } from './SortFilter';

const TitleBar = ({ title, sortFilterData, setParams }) => {
  const { darkMode } = useContext(DataContext);
  return (
    <div
      className={clsx(
        'px-4 py-1 rounded-xl shadow-lg border flex flex-row justify-between items-center',
        darkMode ? darkModeCss : 'bg-white'
      )}
    >
      <p className="text-lg font-bold ">{title || 'Title'}</p>
      <div className="inline-flex items-center gap-2">
        {sortFilterData && (
          <SortFilter
            sort={sortFilterData?.sort}
            filter={sortFilterData?.filter}
            setParams={setParams}
          />
        )}
        <Search setParams={setParams} />
      </div>
    </div>
  );
};
export default TitleBar;
