import { createContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import {
  adminAddDepSv,
  adminGetDepSv,
  adminUpdateDepSv,
} from "../../../service/admin/adminDepartment.sv";
import { initParams } from "./constance";

export const AdminDepContext = createContext({
  deps: Array,
  setDeps: Function,
  showUpdateModal: Boolean,
  setShowUpdateModal: Function,
  selectedDep: Object,
  setSelectedDep: Function,
  pages: Number,
  params: Object,
  setParams: Function,
  loading: Boolean,
  updateDep: Function,
  showAddDepModal: Boolean,
  setShowAddDepModal: Function,
  showDetailDepModal: Boolean,
  setShowDetailDepModal: Function,
  addDep: async (departmentName) => {},
});

export const AdminDepProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [deps, setDeps] = useState([]);
  const [params, setParams] = useState(initParams);
  const [pages, setPages] = useState(0);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddDepModal, setShowAddDepModal] = useState(false);
  const [showDetailDepModal, setShowDetailDepModal] = useState(false);
  const [selectedDep, setSelectedDep] = useState({});

  const getDeps = async () => {
    if (loading) return;
    setDeps([]);
    setLoading(true);
    try {
      const response = await adminGetDepSv(params);
      setDeps(response.departments);
      setPages(response.pages);
    } catch (error) {
      console.log(error?.message || "unknow error");
    } finally {
      setLoading(false);
    }
  };

  const updateDep = async (data) => {
    try {
      const response = await adminUpdateDepSv(data);
      setDeps((prev) => {
        return prev.map((dep) => {
          if (dep._id === data._id)
            return { ...dep, departmentName: data.departmentName };
          else return dep;
        });
      });
      setSelectedDep((prev) => ({
        ...prev,
        departmentName: data.departmentName,
      }));
      ToastAndroid.show(
        response?.message || "Cập nhật khoa thành công",
        ToastAndroid.SHORT
      );
      setShowUpdateModal(false);
    } catch (error) {
      ToastAndroid.show(
        error?.message || "Lỗi khi cập nhật khoa",
        ToastAndroid.SHORT
      );
    }
  };

  const addDep = async (departmentName) => {
    try {
      const response = await adminAddDepSv(departmentName);
      ToastAndroid.show(
        response?.message || "Thêm khoa thành công",
        ToastAndroid.SHORT
      );
      setParams(initParams);
    } catch (error) {
      ToastAndroid.show(
        error?.message || "Lỗi khi thêm khoa",
        ToastAndroid.SHORT
      );
    }
  };

  useEffect(() => {
    getDeps();
  }, [params]);

  return (
    <AdminDepContext.Provider
      value={{
        deps,
        setDeps,
        showUpdateModal,
        setShowUpdateModal,
        selectedDep,
        setSelectedDep,
        pages,
        params,
        setParams,
        loading,
        updateDep,
        showAddDepModal,
        setShowAddDepModal,
        addDep,
        showDetailDepModal,
        setShowDetailDepModal,
      }}
    >
      {children}
    </AdminDepContext.Provider>
  );
};
