import StaffTitleBar from "../../../molecule/staff-title-bar";
import { Item } from "./Item";
import { useContext } from "react";
import { AdminStaffContext } from "./AdminStaffStore";
import Pagination from "../../../molecule/pagination";
import SortFilterModal from "../../../organism/sort-filter-modal";

export const AdminStaffContent = () => {
  const {
    users,
    setParams,
    params,
    pages,
    setHiddenSortFilter,
    hiddenSortFilter,
    filter,
    sort,
  } = useContext(AdminStaffContext);



  return (
    <>
      <SortFilterModal
        hidden={hiddenSortFilter}
        modalTitle={""}
        setParams={setParams}
        params={params}
        onClose={() => setHiddenSortFilter(true)}
        filters={filter}
        sorts={sort}
      />
      <StaffTitleBar
        title={"Quản lý người dùng"}
        setParams={setParams}
        onSearchFilter={() => setHiddenSortFilter(false)}
        // onAdd={() => setHiddenAddDep(false)}
      />
      <div className="mt-2 grid gap-2">
        {users &&
          users.map((user) => (
            <Item key={user._id} text={user.fullName} data={user} />
          ))}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination page={params.page} setParams={setParams} pages={pages} />
      </div>
    </>
  );
};
