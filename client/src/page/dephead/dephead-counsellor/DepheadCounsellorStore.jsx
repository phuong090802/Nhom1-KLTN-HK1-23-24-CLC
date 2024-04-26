import { createContext, useEffect, useState } from "react";
import {
  depheadAddCounsellorSv,
  depheadGetCounsellorsSv,
  depheadUpdateCounsellorStatusSv,
} from "../../../service/dephead/depheadCounsellor.sv";
import { initParams } from "./constance";
import { toast } from "sonner";

export const DepheadCounsellorContext = createContext({
  counsellors: Array,
  setCounsellors: Function,
  params: Object,
  setParams: Function,
  selected: String | Number,
  setSelected: Function,
  pages: Number,
  setPages: Function,
  hiddenSortFilter: Boolean,
  setHiddenSortFilter: Function,
  hiddenAddCounsellor: Boolean,
  setHiddenAddCounsellor: Function,
  depheadAddCounsellor: (data) => {},
  depheadUpdateCounsellorStatus: (counsellorId, data) => {},
});

export const DepheadCounsellorStore = ({ children }) => {
  const [selected, setSelected] = useState(-1);

  const [counsellors, setCounsellors] = useState([]);

  const [params, setParams] = useState(initParams);

  const [pages, setPages] = useState(0);

  const [hiddenSortFilter, setHiddenSortFilter] = useState(true);

  const [hiddenAddCounsellor, setHiddenAddCounsellor] = useState(true);

  const depheadGetCounsellors = async () => {
    try {
      const response = await depheadGetCounsellorsSv(params);
      setCounsellors(response.counsellors);
      setPages(response.pages);
    } catch (error) {
      console.log(error.message || "Lỗi trưởng khoa lấy danh sách nhân viên");
    }
  };

  const depheadAddCounsellor = async (data) => {
    try {
      const response = await depheadAddCounsellorSv(data);
      toast.success(response.message || "Thêm tư vấn viên thành công");
      depheadGetCounsellors();
    } catch (error) {
      toast.error(error.message || "Lỗi khi thêm tư vấn viên");
    }
  };

  const depheadUpdateCounsellorStatus = async (counsellorId, data) => {
    try {
      const response = await depheadUpdateCounsellorStatusSv(
        counsellorId,
        data
      );
      toast.success(
        response.message || "Cập nhật trạng thái tư vấn viên thành công"
      );
      depheadGetCounsellors();
    } catch (error) {
      toast.error(error.message || "Lỗi khi cập nhật trạng thái tư vấn viên");
    }
  };

  useEffect(() => {
    depheadGetCounsellors();
  }, [params]);

  return (
    <DepheadCounsellorContext.Provider
      value={{
        counsellors,
        setCounsellors,
        params,
        setParams,
        selected,
        setSelected,
        pages,
        setPages,
        hiddenSortFilter,
        setHiddenSortFilter,
        hiddenAddCounsellor,
        setHiddenAddCounsellor,
        depheadAddCounsellor,
        depheadUpdateCounsellorStatus,
      }}
    >
      {children}
    </DepheadCounsellorContext.Provider>
  );
};
