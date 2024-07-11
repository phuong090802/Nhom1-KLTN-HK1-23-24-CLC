import { useContext } from "react";
import Pagination from "../../../molecule/pagination";
import StaffTitleBar from "../../../molecule/staff-title-bar";
import SortFilterModal from "../../../organism/sort-filter-modal";
import { AddDeparmentModal } from "./AddDeparmentModal";
import { AdminDepartmentContext } from "./AdminDepartmentStore";
import { DepartmentsTable } from "./DepartmentsTable";
import { DetailDepartmentModal } from "./DetailDepartmentModal";

export const AdminDepartmentContent = () => {
  const {
    params,
    setParams,
    pages,
    hiddenSortFilter,
    setHiddenSortFilter,
    filter,
    sort,
    setHiddenAddDep,
  } = useContext(AdminDepartmentContext);

  return (
    <>
      <DetailDepartmentModal />
      <AddDeparmentModal title={"Thêm khoa"} />
      <SortFilterModal
        modalTitle={"Sắp xếp & Lọc Khoa"}
        hidden={hiddenSortFilter}
        onClose={() => setHiddenSortFilter(true)}
        params={params}
        setParams={setParams}
        filters={filter}
        sorts={sort}
      />
      <StaffTitleBar
        title={"Quản lý khoa"}
        setParams={setParams}
        onSearchFilter={() => setHiddenSortFilter(false)}
        onAdd={() => setHiddenAddDep(false)}
      />
      <div className="mt-2 grid gap-2">
        <DepartmentsTable />
      </div>
      <div className="w-full flex justify-center mt-4">
        <Pagination
          pages={pages || 0}
          page={params.page || 1}
          setParams={setParams}
        />
      </div>
    </>
  );
};
