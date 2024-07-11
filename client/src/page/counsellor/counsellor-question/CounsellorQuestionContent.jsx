import { useContext } from "react";
import StaffTitleBar from "../../../molecule/staff-title-bar";
import { CounsellorQuestionContext } from "./CounsellorQuestionStore";
import { Item } from "./Item";
import Pagination from "../../../molecule/pagination";
import { AnswerQuestionModal } from "./AnswerQuestionModal";
import SortFilterModal from "../../../organism/sort-filter-modal";
import { initFilter, initSort } from "./constance";
import { ForwardQuestionModal } from "./ForwardQuestionModal";
import clsx from "clsx";
import { DataContext } from "../../../store";
import { CounsellorQuestionTable } from "./CounsellorQuestionTable";
import { DetailQuestionModal } from "./DetailQuestionModal";
export const CounsellorQuestionContent = () => {
  const {
    questions,
    params,
    setParams,
    pages,
    setHiddenSortFilter,
    hiddenSortFilter,
  } = useContext(CounsellorQuestionContext);

  const { darkMode } = useContext(DataContext);

  return (
    <>
      <DetailQuestionModal />
      <SortFilterModal
        hidden={hiddenSortFilter}
        modalTitle={"Lọc & sắp xếp"}
        onClose={() => setHiddenSortFilter(true)}
        filters={initFilter}
        sorts={initSort}
        params={params}
      />
      <AnswerQuestionModal />
      <StaffTitleBar
        title={"Danh sách câu hỏi chờ"}
        onSearchFilter={() => setHiddenSortFilter(false)}
      />
      <div className="mt-2 grid gap-2">
        {questions?.length === 0 ? (
          <div
            className={clsx(
              "flex w-full justify-center border py-20 rounded-xl shadow-lg shadow-black75 text-lg font-bold",
              darkMode ? "bg-black75 text-white" : "bg-white"
            )}
          >
            Không có dữ liệu!!
          </div>
        ) : (
          // questions.map((question) => (
          //   <Item key={question._id} data={question} />
          // ))
          <CounsellorQuestionTable />
        )}
      </div>
      <div className="w-full flex justify-center mt-2">
        <Pagination pages={pages} setParams={setParams} page={params.page} />
      </div>
    </>
  );
};
