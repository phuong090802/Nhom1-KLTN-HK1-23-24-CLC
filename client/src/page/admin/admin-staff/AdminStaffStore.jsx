import { createContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  getUsersSv,
  updateUserStatusSv,
} from '../../../service/admin/adminUser.sv';
import { initFilter, initParams, initSort } from './constance';

export const AdminStaffContext = createContext({
  params: Object,
  setParams: Function,
  users: Array,
  setUsers: Function,
  selectedUser: Number | String,
  setSelectedUser: Function,
  updateUser: (userId, data) => {},
  page: Number,
  setPages: Function,
  hiddenSortFilter: Boolean,
  setHiddenSortFilter: Function,
  filter: Array,
  setFilter: Function,
  sort: Array,
  setSort: Function,
  hiddenAddStaffModal: Boolean,
  setHiddenAddStaffModal: Function,
});

export const AdminStaffStore = ({ children }) => {
  const [params, setParams] = useState(initParams);

  const [users, setUsers] = useState(null);

  const [selectedUser, setSelectedUser] = useState(-1);

  const [pages, setPages] = useState(0);

  const [hiddenSortFilter, setHiddenSortFilter] = useState(true);

  const [filter, setFilter] = useState(initFilter);

  const [sort, setSort] = useState(initSort);

  const [hiddenAddStaffModal, setHiddenAddStaffModal] = useState(true);

  const getUser = async () => {
    try {
      const response = await getUsersSv(params);
      setUsers(response.users);
      setPages(response.pages);
    } catch (error) {}
  };

  const updateUser = async (userId, data) => {
    try {
      const response = await updateUserStatusSv(userId, data);
      toast.success(
        response.message || 'Cập nhật trạng thái người dùng thành công'
      );
      getUser();
    } catch (error) {
      toast.success(error?.message || 'Xảy ra lỗi khi cập nhật');
    }
  };

  useEffect(() => {
    getUser();
  }, [params]);
  return (
    <AdminStaffContext.Provider
      value={{
        params,
        setParams,
        users,
        setUsers,
        selectedUser,
        setSelectedUser,
        updateUser,
        pages,
        setPages,
        hiddenSortFilter,
        setHiddenSortFilter,
        filter,
        setFilter,
        sort,
        setSort,
        hiddenAddStaffModal,
        setHiddenAddStaffModal,
      }}
    >
      {children}
    </AdminStaffContext.Provider>
  );
};
