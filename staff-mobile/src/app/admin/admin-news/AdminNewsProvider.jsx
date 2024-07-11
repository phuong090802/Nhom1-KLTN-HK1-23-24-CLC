import React, { createContext, useEffect, useState } from "react";
import { getNewsSv } from "../../../service/admin/adminNews.sv";
import { initParams } from "./constance";

export const AdminNewsContext = createContext({
  showAddNewsModal: Boolean,
  setShowAddNewsModal: Function,
  params: Object,
  setParams: Function,
  newsList: Array,
  setNewsList: Function,
  pages: Number,
  setPages: Function,
  showDetailModal: Boolean,
  setShowDetailModal: Function,
  selectedNews: Object,
  setSelectedNews: Function,
  loading: Boolean,
  setLoading: Function,
});

export const AdminNewsProvider = ({ children }) => {
  const [newsList, setNewsList] = useState([]);

  const [showAddNewsModal, setShowAddNewsModal] = useState(false);

  const [params, setParams] = useState(initParams);

  const [pages, setPages] = useState(0);

  const [showDetailModal, setShowDetailModal] = useState(false);

  const [selectedNews, setSelectedNews] = useState(null);

  const [loading, setLoading] = useState(false);

  const getNews = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getNewsSv();
      setNewsList(response.listNews);
      setPages(response?.pages || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, [params]);

  return (
    <AdminNewsContext.Provider
      value={{
        showAddNewsModal,
        setShowAddNewsModal,
        params,
        setParams,
        newsList,
        setNewsList,
        pages,
        setPages,
        showDetailModal,
        setShowDetailModal,
        selectedNews,
        setSelectedNews,
        loading,
        setLoading,
      }}
    >
      {children}
    </AdminNewsContext.Provider>
  );
};
