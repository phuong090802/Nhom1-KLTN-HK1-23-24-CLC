import React, { createContext, useEffect, useState } from "react";
import { addNewsSv, getNewsSv } from "../../../service/admin/adminNews.sv";
import { toast } from "sonner";
import { initParams } from "./constance";

export const AdminNewsContext = createContext({
  news: Array,
  setNews: Function,
  pages: Number,
  params: Object,
  setParams: Function,
  selectedNews: Object,
  setSelectedNews: Function,
  hiddenDetailNewsModal: Boolean,
  setHiddenDetailNewsModal: Function,
  hiddenAddNewsModal: Boolean,
  setHiddenAddNewsModal: Function,
  getNews: Function,
});

export const AdminNewsStore = ({ children }) => {
  const [news, setNews] = useState(null);

  const [params, setParams] = useState(initParams);

  const [pages, setPages] = useState(0);

  const [selectedNews, setSelectedNews] = useState(null);

  const [hiddenDetailNewsModal, setHiddenDetailNewsModal] = useState(true);

  const [hiddenAddNewsModal, setHiddenAddNewsModal] = useState(true);

  const getNews = async () => {
    try {
      const response = await getNewsSv(params);
      setNews(response?.listNews);
      setPages(response?.pages || 0);
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách tin tức");
    }
  };

 

  useEffect(() => {
    getNews();
  }, [params]);

  return (
    <AdminNewsContext.Provider
      value={{
        news,
        setNews,
        pages,
        params,
        setParams,
        selectedNews,
        setSelectedNews,
        hiddenDetailNewsModal,
        setHiddenDetailNewsModal,
        hiddenAddNewsModal,
        setHiddenAddNewsModal,
        getNews,
      }}
    >
      {children}
    </AdminNewsContext.Provider>
  );
};
