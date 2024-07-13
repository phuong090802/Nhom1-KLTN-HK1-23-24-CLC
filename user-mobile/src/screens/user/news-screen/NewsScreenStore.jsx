import React, { createContext, useEffect, useState } from 'react';
import { getNewsSv } from '../../../services/guest/news.sv';

export const NewsScreenContext = createContext({
  news: [],
  setNews: (news) => {},
  pages: 0,
  setPages: (pages) => {},
  params: {},
  setParams: (params) => {},
  selected: '',
  setSelected: (value) => {},
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
      console.log('Lỗi lấy tin tức', error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const values = {
    news,
    setNews,
    pages,
    setPages,
    params,
    setParams,
    selected,
    setSelected,
  };

  return (
    <NewsScreenContext.Provider value={values}>
      {children}
    </NewsScreenContext.Provider>
  );
};
