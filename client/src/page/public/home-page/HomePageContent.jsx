import clsx from "clsx";
import { Building2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { darkModeCss } from "../../../constance";
import useDepartmentField from "../../../hooks/useDepartmentField";
import Pagination from "../../../molecule/pagination";
import TitleBar from "../../../molecule/title-bar";
import { DataContext } from "../../../store";
import { CreateQuestionModal } from "./CreateQuestionModal";
import { HomeHeader } from "./HomeHeader";
import { HomePageContext } from "./HomePageStore";
import { Item } from "./Item";
import { QuestionDetailModal } from "./QuestionDetailModal";
import { initSort } from "./constance";

export const HomePageContent = () => {
  const { questions, params, pages, setParams } = useContext(HomePageContext);

  const { darkMode } = useContext(DataContext);

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
      <QuestionDetailModal />
      <CreateQuestionModal />
      <HomeHeader />
      <div className="mt-2">
        <div className="px-4 py-1 rounded-xl shadow-lg border flex flex-row justify-between items-center my-2 bg-white">
          <p className="py-2 font-bold text-lg text-black75 ">
            Hãy thử tìm kiếm câu hỏi trước khi hỏi !!
          </p>
        </div>
        <TitleBar
          title={"Tư vấn"}
          sortFilterData={sortFilterData}
          setParams={setParams}
        />
        <div className="mt-2 flex flex-col gap-2">
          {questions?.length === 0 ? (
            <div
              className={clsx(
                "px-4 shadow-black50 shadow-lg py-4 rounded-2xl flex justify-center",
                darkMode ? darkModeCss : "bg-white"
              )}
            >
              <p className="text-black50">Không có câu hỏi nào !!!</p>
            </div>
          ) : (
            questions.map((question) => (
              <Item key={question._id} data={question} />
            ))
          )}
        </div>
        <div className="w-full mt-2 mb-4 flex justify-center items-center">
          <Pagination page={params.page} pages={pages} setParams={setParams} />
        </div>
      </div>
    </>
  );
};
