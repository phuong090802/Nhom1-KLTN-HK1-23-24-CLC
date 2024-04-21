import { useContext } from "react";
import StaffTitleBar from "../../../molecule/staff-title-bar";
import { CounsellorQuestionContext } from "./CounsellorQuestionStore";
import { Item } from "./Item";
import Pagination from "../../../molecule/pagination";
import { AnswerQuestionModal } from "./AnswerQuestionModal";
import SortFilterModal from "../../../organism/sort-filter-modal";
import { initFilter, initSort } from "./constance";
import { ForwardQuestionModal } from "./ForwardQuestionModal";
export const CounsellorQuestionContent = () => {
  const {
    questions,
    params,
    setParams,
    pages,
    setHiddenSortFilter,
    hiddenSortFilter,
  } = useContext(CounsellorQuestionContext);

  return (
    <>
      <SortFilterModal
        hidden={hiddenSortFilter}
        modalTitle={"Lọc & sắp xếp"}
        onClose={() => setHiddenSortFilter(true)}
        filters={initFilter}
        sorts={initSort}
        params={params}
      />
      <AnswerQuestionModal />
      <ForwardQuestionModal />
      <StaffTitleBar
        title={"Danh sách câu hỏi chờ"}
        onSearchFilter={() => setHiddenSortFilter(false)}
      />
      <div className="mt-2 grid gap-2">
        {questions &&
          questions.map((question) => (
            <Item key={question._id} data={question} />
          ))}
      </div>
      <div className="w-full flex justify-center mt-2">
        <Pagination pages={pages} setParams={setParams} page={params.page} />
      </div>
    </>
  );
};
