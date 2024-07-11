import React, { useContext } from "react";
import no_image from "../../../assets/image/no_image.jpg";
import { convertDateTimeToDate } from "../../../util/convert.util";
import { DataContext } from "../../../store";
import clsx from "clsx";
import { darkModeCss } from "../../../constance";
import { NewsPageContext } from "./NewsPageStore";

export const TempItem = ({ data }) => {
  const { darkMode } = useContext(DataContext);

  const { setSelectedNews, setHiddenDetailNewsModal } =
    useContext(NewsPageContext);

  const handleClick = () => {
    setSelectedNews(data);
    setHiddenDetailNewsModal(false);
  };

  return (
    <div
      className={clsx(
        "rounded-md overflow-hidden shadow-lg border cursor-pointer",
        darkMode ? darkModeCss : " hover:bg-primary/5 "
      )}
      key={data?._id || index}
      onClick={handleClick}
    >
      <img
        className="w-full h-40"
        src={
          data?.file?.includes("png") || data?.file?.includes("jpg")
            ? data.file
            : no_image
        }
        alt="News"
      />
      <div className="px-6 py-4">
        <div
          className={clsx(
            "font-bold text-lg mb-2 ",
            darkMode ? "text-white" : "text-black75"
          )}
        >
          {data?.title || "Title content"}
        </div>
        <p
          className={clsx(
            "text-sm line-clamp-2",
            darkMode ? "text-gray-200" : "text-gray-700"
          )}
          dangerouslySetInnerHTML={{ __html: data?.content || "Title content" }}
        />
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {convertDateTimeToDate(data.createdAt)}
        </span>
      </div>
    </div>
  );
};
