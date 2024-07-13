import { createContext, useEffect, useState } from 'react';
import { getNewsSv } from '../../../service/admin/adminNews.sv';
import { initParams } from './constance';

export const AdminNewsContext = createContext({
  showAddNewsModal: false,
  setShowAddNewsModal: (isShowAddNewsModal) => {},
  params: {},
  setParams: (params) => {},
  newsList: [],
  setNewsList: (news) => {},
  pages: 0,
  setPages: (pages) => {},
  showDetailModal: false,
  setShowDetailModal: (isShowDetailModal) => {},
  selectedNews: {},
  setSelectedNews: (news) => {},
  loading: false,
  setLoading: (isLoading) => {},
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
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await getNewsSv();
      setNewsList(response.listNews);
      setPages(response?.pages || 0);
    } catch (error) {
      console.log('getNews', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getNews();
  }, [params]);

  const values = {
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
  };

  return (
    <AdminNewsContext.Provider value={values}>
      {children}
    </AdminNewsContext.Provider>
  );
};
