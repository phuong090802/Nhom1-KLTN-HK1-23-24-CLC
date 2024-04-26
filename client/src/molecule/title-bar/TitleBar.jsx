import React from "react";
import Search from "../../atom/search";
import { SortFilter } from "./SortFilter";

const TitleBar = ({ title, sortFilterData, setParams }) => {
  return (
    <div className="px-4 py-1 bg-white rounded-xl border shadow-lg shadow-black50 flex flex-row justify-between items-center">
      <p className="text-lg font-bold ">{title || "Title"}</p>
      <div className="inline-flex items-center gap-2">
        {sortFilterData && (
          <SortFilter
            sort={sortFilterData?.sort}
            filter={sortFilterData?.filter}
            setParams={setParams}
          />
        )}
        <Search setParams={setParams} />
      </div>
    </div>
  );
};
export default TitleBar;
