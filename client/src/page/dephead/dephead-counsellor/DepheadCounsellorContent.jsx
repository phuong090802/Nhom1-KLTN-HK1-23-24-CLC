import React, { useContext } from "react";
import StaffTitleBar from "../../../molecule/staff-title-bar";
import { DepheadCounsellorContext } from "./DepheadCounsellorStore";
import { Item } from "./Item";
import Pagination from "../../../molecule/pagination";
import SortFilterModal from "../../../organism/sort-filter-modal";
import { initFilter, initSort } from "./constance";
import { DepheadAddCounsellorModal } from "./DepheadAddCounsellorModal";
import { AddCounsellorFieldModal } from "./AddCounsellorFieldModal";

export const DepheadCounsellorContent = () => {
  const {
    counsellors,
    params,
    pages,
    setParams,
    hiddenSortFilter,
    setHiddenSortFilter,
    setHiddenAddCounsellor,
    depheadUpdateCounsellorStatus,
  } = useContext(DepheadCounsellorContext);

  return (
    <>
      <AddCounsellorFieldModal />
      <DepheadAddCounsellorModal />
      <SortFilterModal
        hidden={hiddenSortFilter}
        onClose={() => setHiddenSortFilter(true)}
        params={params}
        setParams={setParams}
        filters={initFilter}
        sorts={initSort}
      />
      <StaffTitleBar
        title={"Quản lý nhân sự"}
        onSearchFilter={() => setHiddenSortFilter(false)}
        setParams={setParams}
        onAdd={() => setHiddenAddCounsellor(false)}
      />
      <div className="mt-2 grid gap-2">
        {counsellors?.length === 0 ? (
          <div className="flex w-full justify-center border py-20 rounded-xl bg-white shadow-lg shadow-black75 text-lg font-bold">
            Không có dữ liệu!!
          </div>
        ) : (
          counsellors.map((counsellor) => (
            <Item key={counsellor._id} data={counsellor} />
          ))
        )}
      </div>
      <div className="w-full flex justify-center mt-4">
        <Pagination page={params.page} pages={pages} setParams={setParams} />
      </div>
    </>
  );
};
