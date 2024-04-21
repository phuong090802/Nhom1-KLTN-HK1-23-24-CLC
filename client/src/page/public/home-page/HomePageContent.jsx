import { Building2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import useDepartmentField from "../../../hooks/useDepartmentField";
import Pagination from "../../../molecule/pagination";
import TitleBar from "../../../molecule/title-bar";
import { CreateQuestionModal } from "./CreateQuestionModal";
import { HomeHeader } from "./HomeHeader";
import { HomePageContext } from "./HomePageStore";
import { Item } from "./Item";
import { initSort } from "./constance";

export const HomePageContent = () => {
  const { questions, params, pages, setParams } = useContext(HomePageContext);

  const { deps } = useDepartmentField();

  const [sortFilterData, setSortFilterData] = useState({ sort: initSort });

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
    <>
      <CreateQuestionModal />
      <HomeHeader />
      <div className="mt-2">
        <TitleBar
          title={"Tư vấn"}
          sortFilterData={sortFilterData}
          setParams={setParams}
        />
        <div className="mt-2 flex flex-col gap-2">
          {questions.map((question) => (
            <Item key={question._id} data={question} />
          ))}
        </div>
        <div className="w-full mt-2 mb-4 flex justify-center items-center">
          <Pagination page={params.page} pages={pages} setParams={setParams} />
        </div>
      </div>
    </>
  );
};
