import { useContext } from "react";
import Pagination from "../../../molecule/pagination";
import StaffTitleBar from "../../../molecule/staff-title-bar";
import SortFilterModal from "../../../organism/sort-filter-modal";
import { AdminDepartmentContext } from "./AdminDepartmentStore";
import { Item } from "./Item";
import { AddDeparmentModal } from "./AddDeparmentModal";
import { UpdateDepartmentModal } from "./UpdateDepartmentModal";

export const AdminDepartmentContent = () => {
  const {
    deps,
    selectedDep,
    setSelectedDep,
    params,
    setParams,
    pages,
    hiddenSortFilter,
    setHiddenSortFilter,
    filter,
    sort,
    updateDepStatus,
    setHiddenAddDep,
    handleEditClick,
  } = useContext(AdminDepartmentContext);

  return (
    <>
      <AddDeparmentModal title={"Thêm khoa"} />
      <UpdateDepartmentModal title={"Cập nhật khoa"}/>
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
        {!!deps && deps.length !== 0 ? (
          deps.map((dep) => (
            <Item
              key={dep._id}
              isSelected={dep._id === selectedDep}
              setSelected={setSelectedDep}
              data={dep}
              status={dep.isActive}
              onEdit={() => handleEditClick(dep._id)}
              onStatus={() =>
                updateDepStatus(dep._id, { isActive: !dep.isActive })
              }
            />
          ))
        ) : (
          <div className="flex w-full justify-center border mt-2 py-20 rounded-xl bg-white shadow-lg shadow-black75 text-lg font-bold">
            Không có dữ liệu!!
          </div>
        )}
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
