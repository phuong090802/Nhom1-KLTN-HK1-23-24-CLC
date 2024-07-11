import React, { createContext, useEffect, useState } from "react";
import { initParams } from "./constance";
import {
  depheadGetCounsellorsSv,
  depheadUpdateCounsellorStatusSv,
} from "../../../service/dephead/depheadCounsellor.sv";
import { ToastAndroid } from "react-native";

export const DepheadCounsellorContext = createContext({
  loading: Boolean,
  setLoading: Function,
  counsellors: Array,
  setCounsellors: Function,
  params: Object,
  setParams: Function,
  pages: Number,
  setPages: Function,
  updateCounsellorStatus: async (counsellorId, data) => {},
  showCounsellorDetailModal: Boolean,
  setShowCounsellorDetailModal: Function,
  selectedCounsellor: Object,
  setSelectedCounsellor: Function,
  showAddCounsellorModal: Boolean,
  setShowAddCounsellorModal: Function,
  getCounsellors: Function,
  showAddFieldsModal: Boolean,
  setShowAddFieldsModal: Function,
});

export const DepheadCounsellorProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [counsellors, setCounsellors] = useState([]);
  const [params, setParams] = useState(initParams);
  const [pages, setPages] = useState(0);
  const [showCounsellorDetailModal, setShowCounsellorDetailModal] =
    useState(false);
  const [showAddCounsellorModal, setShowAddCounsellorModal] = useState(false);
  const [selectedCounsellor, setSelectedCounsellor] = useState({});
  const [showAddFieldsModal, setShowAddFieldsModal] = useState(false);

  const getCounsellors = async () => {
    if (loading) return;
    setLoading(true);
    setCounsellors([]);
    try {
      const response = await depheadGetCounsellorsSv(params);
      setCounsellors(response.counsellors);
      setPages(response.pages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCounsellorStatus = async (counsellorId, data) => {
    try {
      const response = await depheadUpdateCounsellorStatusSv(
        counsellorId,
        data
      );
      setCounsellors((prev) => {
        return prev.map((counsellor) => {
          if (counsellor._id === counsellorId)
            return { ...counsellor, ...data };
          else return counsellor;
        });
      });
      ToastAndroid.show(
        response?.message || "Cập nhật trạng thái người dùng thành công",
        ToastAndroid.SHORT
      );
    } catch (error) {
      ToastAndroid.show(
        error?.message || "Lỗi cập nhật trạng thái người dùng",
        ToastAndroid.SHORT
      );
      console.log(error);
    }
  };

  useEffect(() => {
    getCounsellors();
  }, [params]);

  return (
    <DepheadCounsellorContext.Provider
      value={{
        loading,
        setLoading,
        counsellors,
        setCounsellors,
        params,
        setParams,
        pages,
        setPages,
        updateCounsellorStatus,
        showCounsellorDetailModal,
        setShowCounsellorDetailModal,
        selectedCounsellor,
        setSelectedCounsellor,
        showAddCounsellorModal,
        setShowAddCounsellorModal,
        showAddFieldsModal,
        setShowAddFieldsModal,
      }}
    >
      {children}
    </DepheadCounsellorContext.Provider>
  );
};
