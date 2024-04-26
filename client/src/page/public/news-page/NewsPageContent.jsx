import React, { useContext } from "react";
import TitleBar from "../../../molecule/title-bar";
import { NewsPageContext } from "./NewsPageStore";
import { Item } from "./Item";
import Pagination from "../../../molecule/pagination";

export const NewsPageContent = () => {
  const { listNews, params, setParams, pages } = useContext(NewsPageContext);

  return (
    <div className="mt-2">
      <TitleBar title={"Tin tức"} setParams={setParams} />
      <div className="mt-2 flex flex-col gap-2">
        {listNews.map((news) => (
          <Item key={news._id} data={news} />
        ))}
      </div>
      <div className="mt-2 mb-4 flex justify-center">
        <Pagination page={params.page} setParams={setParams} pages={pages} />
      </div>
    </div>
  );
};
