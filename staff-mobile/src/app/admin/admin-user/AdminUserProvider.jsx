import { createContext, useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import {
  addUserSv,
  adminGetUsersSv,
  updateUserStatusSv,
} from '../../../service/admin/adminUser.sv';
import { initParams } from './constance';

export const AdminUserContext = createContext({
  loading: false,
  users: [],
  setUsers: (users) => {},
  params: {},
  setParams: (params) => {},
  pages: 0,
  updateUserStatus: (userId, data) => {},
  showDetailUserModal: false,
  setShowDetailUserModal: (isShowDetailUserModal) => {},
  selectUser: {},
  setSelectedUser: (user) => {},
  showAddUserModal: false,
  setShowAddUserModal: (isShowAddUserModal) => {},
  AddUser: async (data) => {},
});

export const AdminUserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [params, setParams] = useState(initParams);
  const [pages, setPages] = useState(0);
  const [showDetailUserModal, setShowDetailUserModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectUser, setSelectedUser] = useState({});

  const getUsers = async () => {
    if (loading) return;
    setLoading(true);
    setUsers([]);
    try {
      const response = await adminGetUsersSv(params);
      setUsers(response.users);
      setPages(response.pages);
    } catch (error) {
      console.log('getUsers', error);
    }
    setLoading(false);
  };

  const updateUserStatus = async (userId, data) => {
    try {
      const response = await updateUserStatusSv(userId, data);

      setUsers((prev) => {
        return prev.map((user) => {
          if (user._id === userId)
            return { ...user, isEnabled: data.isEnabled };
          else return user;
        });
      });
      ToastAndroid.show(
        response?.message || 'Cập nhật trạng thái người dùng thàng công',
        ToastAndroid.SHORT
      );
    } catch (error) {
      ToastAndroid.show(
        error?.message || 'Lỗi khi cập nhật trạng thái người dùng',
        ToastAndroid.SHORT
      );
    }
  };

  const AddUser = async (data) => {
    console.log('AddUser', data);
    try {
      const response = await addUserSv(data);
      console.log('AddUser response', response);
      ToastAndroid.show(
        response?.message || 'Thêm người dùng thành công',
        ToastAndroid.SHORT
      );
      setParams(initParams);
    } catch (error) {
      console.log('AddUser', error);
      ToastAndroid.show(
        error?.message || 'Lỗi khi thêm người dùng',
        ToastAndroid.SHORT
      );
    }
  };

  useEffect(() => {
    getUsers();
  }, [params]);

  const values = {
    loading,
    users,
    setUsers,
    params,
    setParams,
    pages,
    updateUserStatus,
    showDetailUserModal,
    setShowDetailUserModal,
    selectUser,
    setSelectedUser,
    showAddUserModal,
    setShowAddUserModal,
    AddUser,
  };

  return (
    <AdminUserContext.Provider value={values}>
      {children}
    </AdminUserContext.Provider>
  );
};
