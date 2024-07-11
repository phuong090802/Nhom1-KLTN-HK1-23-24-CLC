import { createContext, useEffect, useState } from "react";
import {
  addUserSv,
  adminGetUsersSv,
  updateUserStatusSv,
} from "../../../service/admin/adminUser.sv";
import { initParams } from "./constance";
import { ToastAndroid } from "react-native";

export const AdminUserContext = createContext({
  loading: Boolean,
  users: Array,
  setUsers: Function,
  params: Object,
  setParams: Function,
  pages: Number,
  updateUserStatus: (userId, data) => {},
  showDetailUserModal: Boolean,
  setShowDetailUserModal: Function,
  selectUser: Object,
  setSelectedUser: Function,
  showAddUserModal: Object,
  setShowAddUserModal: Function,
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
      console.log(error);
    } finally {
      setLoading(false);
    }
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
        response?.message || "Cập nhật trạng thái người dùng thàng công",
        ToastAndroid.SHORT
      );

    } catch (error) {
      ToastAndroid.show(
        error?.message || "Lỗi khi cập nhật trạng thái người dùng",
        ToastAndroid.SHORT
      );
    }
  };

  const AddUser = async (data) => {
    console.log(data);
    try {
      const response = await addUserSv(data);
      console.log(response);
      ToastAndroid.show(
        response?.message || "Thêm người dùng thành công",
        ToastAndroid.SHORT
      );
      setParams(initParams);
    } catch (error) {
      console.log(error);
      ToastAndroid.show(
        error?.message || "Lỗi khi thêm người dùng",
        ToastAndroid.SHORT
      );
    }
  };

  useEffect(() => {
    getUsers();
  }, [params]);

  return (
    <AdminUserContext.Provider
      value={{
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
      }}
    >
      {children}
    </AdminUserContext.Provider>
  );
};
