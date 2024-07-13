import React, { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  depheadAddFieldSv,
  depheadGetFieldsSv,
  depheadUpdateFieldStatusSv
} from "../../../service/dephead/depheadField.sv";
import { initFilter, initParams, initSort } from "./constance";

export const DepheadFieldContext = createContext({
  fields: Array,
  setFields: Function,
  pages: Number,
  setPages: Function,
  params: Object,
  setParams: Function,
  updateFieldStatus: (fieldId, data) => {},
  hiddenFilterSort: Boolean,
  setHiddenFilterSort: Function,
  sort: Array,
  setSort: Function,
  filter: Array,
  setFilter: Function,
  hiddenAddField: Boolean,
  setHiddenAddField: Function,
  addField: Function
});
export const DepheadFieldStore = ({ children }) => {
  const [fields, setFields] = useState([]);

  const [pages, setPages] = useState(0);

  const [params, setParams] = useState(initParams);

  const [hiddenFilterSort, setHiddenFilterSort] = useState(true);

  const [sort, setSort] = useState(initSort);

  const [filter, setFilter] = useState(initFilter);

  const [hiddenAddField, setHiddenAddField] = useState(true);

  const getFields = async () => {
    try {
      const response = await depheadGetFieldsSv(params);
      setFields(response.fields);
      setPages(response.pages);
    } catch (error) {}
  };

  const updateFieldStatus = async (fieldId, data) => {
    try {
      const response = await depheadUpdateFieldStatusSv(fieldId, data);
      toast.success(
        response.message || "Cập nhật trạng thái lĩnh vực thành công"
      );
      getFields();
    } catch (error) {
      toast.error(error?.message || "Lỗi cập nhật trạng thái lĩnh vực");
    }
  };

  const addField = async (data) => {
    try {
      const response = await depheadAddFieldSv(data);
      toast.success(response?.message || "Thêm lĩnh vực thành công");
      getFields();
    } catch (error) {
      toast.error(error?.message || "Lỗi khi thêm lĩnh vực");
    }
  };

  useEffect(() => {
    getFields();
  }, [params]);

  return (
    <DepheadFieldContext.Provider
      value={{
        fields,
        setFields,
        params,
        setParams,
        updateFieldStatus,
        pages,
        setPages,
        hiddenFilterSort,
        setHiddenFilterSort,
        sort,
        setSort,
        filter,
        setFilter,
        hiddenAddField,
        setHiddenAddField,
        addField
      }}
    >
      {children}
    </DepheadFieldContext.Provider>
  );
};
