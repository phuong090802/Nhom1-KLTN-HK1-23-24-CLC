import { createContext, useEffect, useState } from "react";
import { initFilter, initParams, initSort } from "./constance";
import { depListConvert } from "../../../util/convert.util";
import { getDepartmentsListSv } from "../../../service/public/department.sv";
import {
  addDepSv,
  getDepartmentsSv,
  updateDepStatusSv,
} from "../../../service/admin/adminDepartment.sv";
import { toast } from "sonner";

export const AdminDepartmentContext = createContext({
  deps: Array,
  setDeps: Function,
  selectedDep: String | Number,
  setSelectedDep: Function,
  params: Object,
  setParams: Function,
  pages: Number,
  setPages: Function,
  hiddenSortFilter: Boolean,
  setHiddenSortFilter: Function,
  getDepartmentList: Function,
  getDepartment: Function,
  filter: Array,
  setFilter: Function,
  sort: Array,
  setSort: Function,
  hiddenAddDep: Boolean,
  setHiddenAddDep: Function,
  updateDepStatus: (depId, data) => {},
  chosenDep: String,
  setChosenDep: Function,
  handleEditClick: (depId) => {},
  hiddenUpdateDep: Boolean,
  setHiddenUpdateDep: Function,
  addDeparment: Function,
  hiddenDetailDepModal: Boolean,
  setHiddenDetailDepModal: Function,
});

const AdminDepartmentStore = ({ children }) => {
  const [deps, setDeps] = useState([]);

  const [selectedDep, setSelectedDep] = useState(null);

  const [params, setParams] = useState(initParams);

  const [pages, setPages] = useState(0);

  const [hiddenSortFilter, setHiddenSortFilter] = useState(true);

  const [filter, setFilter] = useState(initFilter);

  const [sort, setSort] = useState(initSort);

  const [hiddenAddDep, setHiddenAddDep] = useState(true);

  const [chosenDep, setChosenDep] = useState(null);

  const [hiddenDetailDepModal, setHiddenDetailDepModal] = useState(true);

  const getDepartment = async () => {
    try {
      const response = await getDepartmentsSv(params);
      setDeps(response.departments);
      setPages(response.pages);
    } catch (error) {}
  };

  const updateDepStatus = async (depId, data) => {
    try {
      const response = await updateDepStatusSv(depId, data);
      toast.success(response.message || "Cập nhật trạng thái khoa thành công");
      getDepartment();
    } catch (error) {
      toast.error(error?.message || "Lỗi khi cập nhật trạng thái khoa");
    }
  };

  useEffect(() => {
    getDepartment();
  }, [params]);

  return (
    <AdminDepartmentContext.Provider
      value={{
        deps,
        setDeps,
        selectedDep,
        setSelectedDep,
        params,
        setParams,
        pages,
        setPages,
        hiddenSortFilter,
        setHiddenSortFilter,
        getDepartment,
        filter,
        setFilter,
        sort,
        setSort,
        updateDepStatus,
        hiddenAddDep,
        setHiddenAddDep,
        chosenDep,
        setChosenDep,
        hiddenDetailDepModal,
        setHiddenDetailDepModal,
      }}
    >
      {children}
    </AdminDepartmentContext.Provider>
  );
};

export default AdminDepartmentStore;
