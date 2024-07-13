import { createContext, useEffect, useState } from 'react';
import { getFaqsSv } from '../../../services/guest/faqs.sv';
import { initParams } from './constance';

export const FaqsStoreContext = createContext({
  faqs: [],
  setFaqs: (faqs) => {},
  params: {},
  setParams: (params) => {},
  selected: '',
  setSelected: (value) => {},
  pages: 0,
  endReached: false,
  setEndReached: (isEndReached) => {},
  handleLazy: (nativeEvent) => {},
  loading: false,
  setLoading: (isLoading) => {},
});

export const FaqsScreenStore = ({ children }) => {
  const [faqs, setFaqs] = useState([]);
  const [params, setParams] = useState(initParams);
  const [selected, setSelected] = useState(-1);
  const [pages, setPages] = useState(0);
  const [endReached, setEndReached] = useState(false);
  const [loading, setLoading] = useState(false);

  const getFaqs = async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const response = await getFaqsSv(params);
      setFaqs((prev) => [...prev, ...response.faqs]);
      setPages(response.pages);
    } catch (error) {
      console.log('getFaqs', error.message || 'Lỗi lấy câu hỏi chung !');
    }
    setEndReached(false);
    setLoading(false);
  };

  const handleLazy = (nativeEvent) => {
    if (!endReached && isCloseToBottom(nativeEvent) && params.page < pages) {
      setParams((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 8;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  useEffect(() => {
    getFaqs();
  }, [params]);

  const values = {
    faqs,
    setFaqs,
    params,
    setFaqs,
    selected,
    setSelected,
    pages,
    handleLazy,
    loading,
    setLoading,
  };

  return (
    <FaqsStoreContext.Provider value={values}>
      {children}
    </FaqsStoreContext.Provider>
  );
};
