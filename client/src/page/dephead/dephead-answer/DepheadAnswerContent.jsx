import { useContext } from 'react';
import Pagination from '../../../molecule/pagination';
import StaffTitleBar from '../../../molecule/staff-title-bar';
import { DepheadAnswerContext } from './DepheadAnswerStore';
import { DepheadAnswerTable } from './DepheadAnswerTable';
import { DetailAnswerModal } from './DetailAnswerModal';

export const DepheadAnswerContent = () => {
  const { waitingQuestions, pages, params, setParams } =
    useContext(DepheadAnswerContext);
  return (
    <div>
      <DetailAnswerModal />
      <StaffTitleBar title={'Câu trả lời chờ duyệt'} />
      <div className="mt-2 grid gap-2">
        {waitingQuestions?.length === 0 ? (
          <div className="flex w-full justify-center border py-20 rounded-xl bg-white shadow-lg shadow-black75 text-lg font-bold">
            Không có câu hỏi nào chờ duyệt!!
          </div>
        ) : (
          // waitingQuestions.map((question) => {
          //   return <Item key={question._id} data={question} />;
          // })
          <DepheadAnswerTable />
        )}
      </div>
      <div className="mt-2 justify-center flex">
        <Pagination pages={pages} page={params.page} setParams={setParams} />
      </div>
    </div>
  );
};
