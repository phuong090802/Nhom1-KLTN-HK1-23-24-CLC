import { createContext, useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import {
  adminAddDepSv,
  adminGetDepSv,
  adminUpdateDepSv,
} from '../../../service/admin/adminDepartment.sv';
import { initParams } from './constance';

export const AdminDepContext = createContext({
  deps: [],
  setDeps: (departments) => {},
  showUpdateModal: false,
  setShowUpdateModal: (isShowUpdateModal) => {},
  selectedDep: {},
  setSelectedDep: (department) => {},
  pages: 0,
  params: {},
  setParams: (params) => {},
  loading: false,
  updateDep: (department) => {},
  showAddDepModal: false,
  setShowAddDepModal: (isShowAddDepModal) => {},
  showDetailDepModal: false,
  setShowDetailDepModal: (isShowDetailDepModal) => {},
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
    if (loading) {
      return;
    }
    setDeps([]);
    setLoading(true);
    try {
      const response = await adminGetDepSv(params);
      setDeps(response.departments);
      setPages(response.pages);
    } catch (error) {
      console.log('getDeps', error?.message || 'unknow error');
    }
    setLoading(false);
  };

  const updateDep = async (data) => {
    try {
      const response = await adminUpdateDepSv(data);
      setDeps((prev) => {
        return prev.map((dep) => {
          if (dep._id === data._id) {
            return { ...dep, departmentName: data.departmentName };
          } else {
            return dep;
          }
        });
      });
      setSelectedDep((prev) => ({
        ...prev,
        departmentName: data.departmentName,
      }));
      ToastAndroid.show(
        response?.message || 'Cập nhật khoa thành công',
        ToastAndroid.SHORT
      );
      setShowUpdateModal(false);
    } catch (error) {
      ToastAndroid.show(
        error?.message || 'Lỗi khi cập nhật khoa',
        ToastAndroid.SHORT
      );
    }
  };

  const addDep = async (departmentName) => {
    try {
      const response = await adminAddDepSv(departmentName);
      ToastAndroid.show(
        response?.message || 'Thêm khoa thành công',
        ToastAndroid.SHORT
      );
      setParams(initParams);
    } catch (error) {
      ToastAndroid.show(
        error?.message || 'Lỗi khi thêm khoa',
        ToastAndroid.SHORT
      );
    }
  };

  useEffect(() => {
    getDeps();
  }, [params]);

  const values = {
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
  };

  return (
    <AdminDepContext.Provider value={values}>
      {children}
    </AdminDepContext.Provider>
  );
};
