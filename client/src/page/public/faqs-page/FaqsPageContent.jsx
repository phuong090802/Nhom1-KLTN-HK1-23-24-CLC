import clsx from 'clsx';
import { Building2 } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { darkModeCss } from '../../../constance';
import useDepartmentField from '../../../hooks/useDepartmentField';
import Pagination from '../../../molecule/pagination';
import TitleBar from '../../../molecule/title-bar';
import { DataContext } from '../../../store';
import { initSort } from './constance';
import { FaqsPageContext } from './FaqsPageStore';
import { Item } from './Item';

export const FaqsPageContent = () => {
  const { faqs, params, setParams, pages } = useContext(FaqsPageContext);

  const { darkMode } = useContext(DataContext);

  const [sortFilterData, setSortFilterData] = useState({ sort: initSort });

  const { deps } = useDepartmentField();

  useEffect(() => {
    if (deps.length !== 0) {
      setSortFilterData((prev) => ({
        ...prev,
        filter: [
          {
            placeholder: 'Khoa',
            name: 'department',
            icon: <Building2 size={20} />,
            data: deps,
          },
        ],
      }));
    }
  }, [deps]);

  return (
    <div className="mt-2">
      <TitleBar
        title={'Thư viện câu hỏi'}
        setParams={setParams}
        sortFilterData={sortFilterData}
      />
      <div className="mt-2 flex flex-col gap-2">
        {faqs?.length === 0 ? (
          <div
            className={clsx(
              'px-4 shadow-black50 shadow-lg py-4 rounded-2xl flex justify-center',
              darkMode ? darkModeCss : 'bg-white'
            )}
          >
            <p className="text-black50">Không có câu hỏi nào !!!</p>
          </div>
        ) : (
          faqs.map((faq) => (
            <>
              <Item key={faq._id} data={faq} />
            </>
          ))
        )}
      </div>
      <div className="flex justify-center items-center mt-2 mb-4">
        <Pagination page={params.page} pages={pages} setParams={setParams} />
      </div>
    </div>
  );
};
