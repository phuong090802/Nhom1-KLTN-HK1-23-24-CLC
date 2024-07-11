import React, { createContext, useContext, useEffect, useState } from "react";
import { initParams } from "./constance";
import {
  depheadAddFieldSv,
  depheadGetFieldSv,
  depheadUpdateFieldStatusSv,
  depheadUpdateFieldSv,
} from "../../../service/dephead/depheadField.sv";
import { ToastAndroid } from "react-native";

export const DepheadFieldContext = createContext({
  loading: Boolean,
  setLoading: Function,
  fields: Array,
  setFields: Function,
  params: Object,
  setParams: Function,
  pages: Number,
  setPages: Function,
  updateFieldStatus: (fieldId, data) => {},
  showAddFieldModal: Boolean,
  setShowAddFieldModal: Function,
  showUpdateFieldModal: Boolean,
  setShowUpdateFieldModal: Function,
  addField: async (fieldName) => {},
  updateField: async (fieldName) => {},
  selectedField: Object,
  setSelectedField: Function,
});

export const DepheadFieldProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState([]);
  const [params, setParams] = useState(initParams);
  const [pages, setPages] = useState(0);
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [showUpdateFieldModal, setShowUpdateFieldModal] = useState(false);
  const [selectedField, setSelectedField] = useState({});

  const getFields = async () => {
    if (loading) return;
    setLoading(true);
    setFields([]);
    try {
      const response = await depheadGetFieldSv(params);
      setFields(response.fields);
      setPages(response.pages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateFieldStatus = async (fieldId, data) => {
    try {
      const response = await depheadUpdateFieldStatusSv(fieldId, data);

      setFields((prev) => {
        return prev.map((field) => {
          if (field._id === fieldId)
            return { ...field, isActive: data.isActive };
          else return field;
        });
      });
      console.log(response);
      ToastAndroid.show(
        response?.message || "Cập nhật trạng thái lĩnh vực thàng công",
        ToastAndroid.SHORT
      );
    } catch (error) {
      console.log(error);
      ToastAndroid.show(
        error?.message || "Lỗi khi cập nhật trạng thái lĩnh vực",
        ToastAndroid.SHORT
      );
    }
  };

  const addField = async (fieldName) => {
    try {
      const response = await depheadAddFieldSv(fieldName);
      console.log(response);
      ToastAndroid.show(
        response?.message || "Thêm lĩnh vực thàng công",
        ToastAndroid.SHORT
      );
      setParams(initParams);
    } catch (error) {
      console.log(error);
      ToastAndroid.show(
        error?.message || "Lỗi khi thêm lĩnh vực",
        ToastAndroid.SHORT
      );
    }
  };

  const updateField = async (fieldName) => {
    try {
      const response = await depheadUpdateFieldSv(selectedField._id, fieldName);
      console.log(response);
      ToastAndroid.show(
        response?.message || "Cập nhật lĩnh vực thàng công",
        ToastAndroid.SHORT
      );
      setFields((prev) => {
        return prev.map((field) => {
          if (field._id === selectedField._id) return { ...field, fieldName };
          else return field;
        });
      });
      setSelectedField((prev) => ({ ...prev, fieldName }));
    } catch (error) {
      console.log(error);
      ToastAndroid.show(
        error?.message || "Lỗi khi cập nhật lĩnh vực",
        ToastAndroid.SHORT
      );
    }
  };

  useEffect(() => {
    getFields();
  }, [params]);

  return (
    <DepheadFieldContext.Provider
      value={{
        loading,
        setLoading,
        fields,
        setFields,
        params,
        setParams,
        pages,
        setPages,
        updateFieldStatus,
        showAddFieldModal,
        setShowAddFieldModal,
        showUpdateFieldModal,
        setShowUpdateFieldModal,
        addField,
        selectedField,
        setSelectedField,
        updateField,
      }}
    >
      {children}
    </DepheadFieldContext.Provider>
  );
};
