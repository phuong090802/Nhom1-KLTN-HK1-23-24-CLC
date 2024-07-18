import { useContext } from "react";
import Pagination from "../../../molecule/pagination";
import StaffTitleBar from "../../../molecule/staff-title-bar";
import SortFilterModal from "../../../organism/sort-filter-modal";
import { DepheadAddFIeldModal } from "./DepheadAddFIeldModal";
import { DepheadFieldContext } from "./DepheadFieldStore";
import { DepheadFieldTable } from "./DepheadFieldTable";

export const DepheadFieldContent = () => {
  const {
    fields,
    setFields,
    params,
    setParams,
    updateFieldStatus,
    pages,
    hiddenFilterSort,
    setHiddenFilterSort,
    sort,
    filter,
    setHiddenAddField,
  } = useContext(DepheadFieldContext);

  return (
    <>
      <DepheadAddFIeldModal />
      <SortFilterModal
        hidden={hiddenFilterSort}
        onClose={() => setHiddenFilterSort(true)}
        params={params}
        setParams={setParams}
        sorts={sort}
        filters={filter}
        modalTitle={"Lọc & Sắp xếp"}
      />
      <StaffTitleBar
        title={"Quản lý lĩnh vực"}
        onSearchFilter={() => setHiddenFilterSort(false)}
        setParams={setParams}
        onAdd={() => setHiddenAddField(false)}
      />
      <div className="mt-2 grid gap-2">
        {fields?.length === 0 ? (
          <div className="flex w-full justify-center border py-20 rounded-xl bg-white shadow-lg shadow-black75 text-lg font-bold">
            Không có dữ liệu!!
          </div>
        ) : (
          <DepheadFieldTable />
        )}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination page={params.page} setParams={setParams} pages={pages} />
      </div>
    </>
  );
};
