import clsx from 'clsx';
import { Ban, SlidersHorizontal } from 'lucide-react';
import { useCallback, useState } from 'react';
import MyButton from '../../atom/my-button';
import MySelect from '../../atom/my-select';

export const SortFilter = ({ sort, filter, setParams }) => {
  const [hidden, setHidden] = useState(true);

  const [tempSort, setTempSort] = useState({});
  const [tempFilter, setTempFilter] = useState({});

  const onSortChange = (value, name) => {
    setTempSort((prev) => ({ ...prev, [name]: value }));
  };
  const onFilterChange = (value, name) => {
    setTempFilter((prev) => ({ ...prev, [name]: value }));
  };
  const handleSortFilter = useCallback(() => {
    console.log(tempFilter, tempSort);
    setParams((prev) => ({ ...prev, sort: tempSort, filter: tempFilter }));
    setHidden(true);
  }, [setParams, tempSort, tempFilter]);

  return (
    <div className={clsx('relative')}>
      <div
        className={clsx(
          'p-2 rounded-lg cursor-pointer duration-500',
          !hidden && 'bg-black10 '
        )}
      >
        <SlidersHorizontal
          size={20}
          onClick={() => setHidden((prev) => !prev)}
        />
      </div>
      <div
        className={clsx(
          'px-2 py-4 absolute top-10 -right-10 border border-black25 shadow-lg shadow-black50 rounded-lg bg-white w-[30rem]',
          hidden && 'hidden'
        )}
      >
        {filter && (
          <>
            <h1 className="text-lg font-semibold text-black75 self-end">
              Bộ lọc:
            </h1>
            <div className="grid grid-cols-2 gap-4">
              {filter.map((item, index) => {
                return (
                  <div className=" relative" key={index}>
                    <MySelect
                      className="w-full pl-8"
                      placeholder={item.placeholder || 'Chọn ...'}
                      data={item.data}
                      value={tempFilter?.[item.name]}
                      onChange={(value) => onFilterChange(value, item.name)}
                    />
                    <div className=" absolute top-[6px] left-1 text-black75">
                      {item.icon || <Ban size={20} />}
                    </div>
                  </div>
                );
              })}
            </div>
            <span className="border block my-2"></span>
          </>
        )}
        {sort && (
          <>
            <h1 className="text-lg font-semibold text-black75 self-end">
              Sắp xếp:
            </h1>
            <div className="grid grid-cols-2 gap-4">
              {sort.map((item, index) => {
                return (
                  <div className=" relative" key={index}>
                    <MySelect
                      className="w-full pl-8"
                      placeholder={item.placeholder || 'Chọn ...'}
                      data={item.data}
                      value={tempSort?.[item.name]}
                      onChange={(value) => onSortChange(value, item.name)}
                    />
                    <div className=" absolute top-[6px] left-1 text-black75">
                      {item.icon || <Ban size={20} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        <div className="mt-2 w-full flex flex-row-reverse">
          <MyButton className="bg-primary" onClick={handleSortFilter}>
            Lọc
          </MyButton>
        </div>
      </div>
    </div>
  );
};
