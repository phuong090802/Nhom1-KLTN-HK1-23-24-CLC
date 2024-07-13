import { createContext, useEffect, useState } from "react";
import { getFaqsSv } from "../../../services/guest/faqs.sv";
import { initParams } from "./constance";

export const FaqsStoreContext = createContext({
  faqs: Array,
  setFaqs: Function,
  params: Object,
  setParams: Function,
  selected: String | Number,
  setSelected: Function,
  pages: Number,
  endReached: Boolean,
  setEndReached: Function,
  handleLazy: (nativeEvent) => {},
  loading: Boolean,
  setLoading: Function,
});

export const FaqsScreenStore = ({ children }) => {
  const [faqs, setFaqs] = useState([]);

  const [params, setParams] = useState(initParams);

  const [selected, setSelected] = useState(-1);

  const [pages, setPages] = useState(0);

  const [endReached, setEndReached] = useState(false);

  const [loading, setLoading] = useState(false);

  const getFaqs = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const response = await getFaqsSv(params);
      setFaqs((prev) => [...prev, ...response.faqs]);
      setPages(response.pages);
    } catch (error) {
      console.log(error.message || "Lỗi lấy câu hỏi chung !");
    } finally {
      setEndReached(false);
      setLoading(false);
    }
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

  return (
    <FaqsStoreContext.Provider
      value={{
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
      }}
    >
      {children}
    </FaqsStoreContext.Provider>
  );
};
