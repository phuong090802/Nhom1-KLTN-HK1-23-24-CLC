import React, { createContext, useEffect, useState } from "react";
import {
  depheadCreateFaqSv,
  depheadGetFaqsSv,
} from "../../../service/dephead/depheadFaq.sv";
import { initParams } from "./constance";
import { toast } from "sonner";

export const DepheadFaqContext = createContext({
  faqs: Array,
  setFaqs: Function,
  params: Object,
  setParams: Function,
  selected: Number | String,
  setSelected: Function,
  pages: Number,
  setPages: Function,
  hiddenAddFaq: Boolean,
  setHiddenAddFaq: Function,
  depheadGetFaqs: Function,
});
export const DepheadFaqStore = ({ children }) => {
  const [faqs, setFaqs] = useState([]);

  const [params, setParams] = useState(initParams);

  const [selected, setSelected] = useState(-1);

  const [pages, setPages] = useState(0);

  const [hiddenAddFaq, setHiddenAddFaq] = useState(true);

  const depheadGetFaqs = async () => {
    try {
      const response = await depheadGetFaqsSv(params);
      setFaqs(response.faqs);
      setPages(response.pages);
    } catch (error) {
      toast.error(error.message || "Lỗi lấy dữ liệu faqs");
    }
  };

  useEffect(() => {
    depheadGetFaqs();
  }, [params]);

  return (
    <DepheadFaqContext.Provider
      value={{
        faqs,
        setFaqs,
        params,
        setParams,
        selected,
        setSelected,
        pages,
        setPages,
        hiddenAddFaq,
        setHiddenAddFaq,
        depheadGetFaqs,
      }}
    >
      {children}
    </DepheadFaqContext.Provider>
  );
};
