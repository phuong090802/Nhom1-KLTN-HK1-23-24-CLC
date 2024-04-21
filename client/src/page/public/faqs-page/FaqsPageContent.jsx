import React, { useContext, useEffect, useState } from "react";
import TitleBar from "../../../molecule/title-bar";
import { Item } from "./Item";
import { FaqsPageContext } from "./FaqsPageStore";
import Pagination from "../../../molecule/pagination";
import useDepartmentField from "../../../hooks/useDepartmentField";
import { Building2 } from "lucide-react";
import { initSort } from "./constance";

export const FaqsPageContent = () => {
  const { faqs, params, setParams, pages } = useContext(FaqsPageContext);

  const [sortFilterData, setSortFilterData] = useState({ sort: initSort });

  const { deps } = useDepartmentField();

  useEffect(() => {
    if (deps.length !== 0) {
      setSortFilterData((prev) => ({
        ...prev,
        filter: [
          {
            placeholder: "Khoa",
            name: "department",
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
        title={"Thư viện câu hỏi"}
        setParams={setParams}
        sortFilterData={sortFilterData}
      />
      <div className="mt-2 flex flex-col gap-2">
        {faqs.map((faq) => (
          <Item key={faq._id} data={faq} />
        ))}
      </div>
      <div className="flex justify-center items-center mt-2 mb-4">
        <Pagination page={params.page} pages={pages} setParams={setParams} />
      </div>
    </div>
  );
};
