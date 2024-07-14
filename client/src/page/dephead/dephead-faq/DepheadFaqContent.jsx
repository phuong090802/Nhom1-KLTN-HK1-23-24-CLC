import { useContext } from 'react';
import Pagination from '../../../molecule/pagination';
import StaffTitleBar from '../../../molecule/staff-title-bar';
import { AddFaqModal } from './AddFaqModal';
import { DepheadFaqContext } from './DepheadFaqStore';
import { DepheadFaqTable } from './DepheadFaqTable';
import { DetailFaqModal } from './DetailFaqModal';

export const DepheadFaqContent = () => {
  const { faqs, params, setParams, pages, setHiddenAddFaq } =
    useContext(DepheadFaqContext);

  return (
    <>
      <DetailFaqModal />
      <AddFaqModal />
      <StaffTitleBar
        title={'Quản lý câu hỏi chung'}
        onAdd={() => setHiddenAddFaq(false)}
        setParams={setParams}
      />
      <div className="mt-2 grid gap-2">
        {faqs?.length === 0 ? (
          <div className="flex w-full justify-center border py-20 rounded-xl bg-white shadow-lg shadow-black75 text-lg font-bold">
            Không có dữ liệu!!
          </div>
        ) : (
          <DepheadFaqTable />
        )}
      </div>
      <div className="flex justify-center mt-2">
        <Pagination
          page={params.page || 1}
          setParams={setParams}
          pages={pages}
        />
      </div>
    </>
  );
};
