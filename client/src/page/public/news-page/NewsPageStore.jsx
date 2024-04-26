import React, { createContext, useEffect, useState } from "react";
import { getNewsSv } from "../../../service/public/news.sv";
import { initParams } from "./constance";

export const NewsPageContext = createContext({
  listNews: Array,
  selected: Boolean,
  setSelected: Function,
  params: Number,
  setParams: Function,
  pages: Number,
});

export const NewsPageStore = ({ children }) => {
  const [listNews, setListNews] = useState([]);

  const [selected, setSelected] = useState("");

  const [pages, setPages] = useState(0);

  const [params, setParams] = useState(initParams);

  const getNews = async () => {
    try {
      const response = await getNewsSv(params);
      setListNews(response.listNews);
      setPages(response.pages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNews();
  }, [params]);

  return (
    <NewsPageContext.Provider
      value={{ listNews, selected, setSelected, pages, params, setParams }}
    >
      {children}
    </NewsPageContext.Provider>
  );
};
