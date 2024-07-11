import React, { useContext } from "react";
import TitleBar from "../../../molecule/title-bar";
import { NewsPageContext } from "./NewsPageStore";
import { Item } from "./Item";
import Pagination from "../../../molecule/pagination";
import clsx from "clsx";
import { darkModeCss } from "../../../constance";
import { DataContext } from "../../../store";
import { TempItem } from "./TempItem";
import { DetailNewsModal } from "./DetailNewsModal";

export const NewsPageContent = () => {
  const { listNews, params, setParams, pages } = useContext(NewsPageContext);
  const { darkMode } = useContext(DataContext);

  return (
    <div className="mt-2">
      <DetailNewsModal />
      <TitleBar title={"Tin tức"} setParams={setParams} />
      {/* <div className="mt-2 flex flex-col gap-2"> */}
      <div className="grid grid-cols-3 gap-2 mt-2">
        {listNews?.length === 0 ? (
          <div
            className={clsx(
              "px-4 shadow-black50 shadow-lg py-4 rounded-2xl flex justify-center col-span-3",
              darkMode ? darkModeCss : "bg-white"
            )}
          >
            <p className="text-black50 ">Không có dữ liệu !!!</p>
          </div>
        ) : (
          listNews.map((news) => <TempItem key={news._id} data={news} />)
        )}
      </div>
      <div className="mt-2 mb-4 flex justify-center">
        <Pagination page={params.page} setParams={setParams} pages={pages} />
      </div>
    </div>
  );
};
