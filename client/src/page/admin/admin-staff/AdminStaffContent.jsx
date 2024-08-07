import { useContext } from 'react';
import Pagination from '../../../molecule/pagination';
import StaffTitleBar from '../../../molecule/staff-title-bar';
import SortFilterModal from '../../../organism/sort-filter-modal';
import { AddStaffModal } from './AddStaffModal';
import { AdminStaffContext } from './AdminStaffStore';
import { Item } from './Item';

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
    setHiddenAddStaffModal,
  } = useContext(AdminStaffContext);

  return (
    <>
      <AddStaffModal />
      <SortFilterModal
        hidden={hiddenSortFilter}
        modalTitle={''}
        setParams={setParams}
        params={params}
        onClose={() => setHiddenSortFilter(true)}
        filters={filter}
        sorts={sort}
      />
      <StaffTitleBar
        title={'Quản lý người dùng'}
        setParams={setParams}
        onSearchFilter={() => setHiddenSortFilter(false)}
        onAdd={() => setHiddenAddStaffModal(false)}
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
