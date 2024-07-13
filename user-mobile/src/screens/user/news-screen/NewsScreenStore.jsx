import React, { Children, createContext, useEffect, useState } from "react";
import { getNewsSv } from "../../../services/guest/news.sv";

export const NewsScreenContext = createContext({
  news: Array,
  setNews: Function,
  pages: Number,
  setPages: Function,
  params: Object,
  setParams: Function,
  selected: String | Number,
  setSelected: Function,
});

export const NewScreenStore = ({ children }) => {
  const [news, setNews] = useState([]);

  const [pages, setPages] = useState(0);

  const [params, setParams] = useState({});

  const [selected, setSelected] = useState(-1);

  const getNews = async () => {
    try {
      const response = await getNewsSv(params);
      setNews(response.listNews);
      setPages(response.pages);
    } catch (error) {
      console.log("Lỗi lấy tin tức", error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <NewsScreenContext.Provider
      value={{
        news,
        setNews,
        pages,
        setPages,
        params,
        setParams,
        selected,
        setSelected,
      }}
    >
      {children}
    </NewsScreenContext.Provider>
  );
};
