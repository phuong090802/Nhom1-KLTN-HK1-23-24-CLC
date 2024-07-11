import React, { useContext, useEffect, useState } from "react";
import TitleBar from "../../../molecule/title-bar";
import { CounsellorPageContext } from "./CounsellorPageStore";
import { Item } from "./Item";
import Pagination from "../../../molecule/pagination";
import useDepartmentField from "../../../hooks/useDepartmentField";
import { initSort } from "./constance";
import { Building2 } from "lucide-react";
import clsx from "clsx";
import { darkModeCss } from "../../../constance";
import { DataContext } from "../../../store";

export const CounsellorPageContent = () => {
  const { counsellors, pages, params, setParams } = useContext(
    CounsellorPageContext
  );

  const { darkMode } = useContext(DataContext);

  const [sortFilterData, setSortFilterData] = useState({ sort: initSort });

  const { deps } = useDepartmentField();

  useEffect(() => {
    if (deps.length !== 0) {
      setSortFilterData((prev) => ({
        ...prev,
        filter: [
          {
            placeholder: "Khoa",
            name: "counsellor.department",
            icon: <Building2 size={20} />,
            data: deps,
          },
        ],
      }));
    }
  }, [deps]);

  return (
    <div className="mt-2">
      <TitleBar
        title={"Danh sách tư vấn viên"}
        setParams={setParams}
        sortFilterData={sortFilterData}
      />
      <div className="mt-2 flex flex-col gap-2">
        {counsellors?.length === 0 ? (
          <div
            className={clsx(
              "px-4 shadow-black50 shadow-lg py-4 rounded-2xl flex justify-center",
              darkMode ? darkModeCss : "bg-white"
            )}
          >
            <p className="text-black50">Không có dữ liệu !!!</p>
          </div>
        ) : (
          counsellors.map((counsellor) => (
            <Item key={counsellor._id} data={counsellor} />
          ))
        )}
      </div>
      <div className=" mt-2 flex justify-center">
        <Pagination page={params.page} pages={pages} setParams={setParams} />
      </div>
    </div>
  );
};
