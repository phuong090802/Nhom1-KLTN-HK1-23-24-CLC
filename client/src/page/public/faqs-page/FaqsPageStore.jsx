import React, { createContext, useEffect, useState } from "react";
import { getFaqsSv } from "../../../service/public/faqs.sv";
import { toast } from "sonner";
import { initParams } from "./constance";

export const FaqsPageContext = createContext({
  faqs: Array,
  pages: Number,
  params: Object,
  setParams: Function,
  selected: String,
  setSelected: Function,
});

export const FaqsPageStore = ({ children }) => {
  const [faqs, setFaqs] = useState([]);

  const [pages, setPages] = useState(0);

  const [params, setParams] = useState(initParams);

  const [selected, setSelected] = useState("");

  const getFaqs = async () => {
    console.log(params);
    try {
      const response = await getFaqsSv(params);
      setFaqs(response.faqs);
      setPages(response.pages);
    } catch (error) {
      toast.warning(error?.message || "Lỗi khi lấy dữ liệu");
    }
  };

  useEffect(() => {
    getFaqs();
  }, [params]);

  return (
    <FaqsPageContext.Provider
      value={{ faqs, pages, params, setParams, selected, setSelected }}
    >
      {children}
    </FaqsPageContext.Provider>
  );
};
