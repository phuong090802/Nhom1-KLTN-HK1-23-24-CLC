import React, { Children, createContext, useEffect, useState } from "react";
import { getCounsellorListSv } from "../../../service/public/cousellor.sv";
import { initParams } from "./constance";
import { toast } from "sonner";

export const CounsellorPageContext = createContext({
  counsellors: Array,
  pages: Number,
  params: Object,
  setParams: Function,
  selected: String,
  setSelected: Function,
});

export const CounsellorPageStore = ({ children }) => {
  const [counsellors, setCounsellors] = useState([]);

  const [params, setParams] = useState(initParams);

  const [selected, setSelected] = useState("");

  const [pages, setPages] = useState(0);

  const getCounsellors = async () => {
    try {
      const response = await getCounsellorListSv(params);
      setCounsellors(response.staffs);
      setPages(response.pages);
    } catch (error) {
      toast.warning(error.message || "Lỗi khi lấy dữ liệu");
    }
  };

  useEffect(() => {
    getCounsellors();
  }, [params]);

  return (
    <CounsellorPageContext.Provider
      value={{ counsellors, pages, params, setParams, selected, setSelected }}
    >
      {children}
    </CounsellorPageContext.Provider>
  );
};
