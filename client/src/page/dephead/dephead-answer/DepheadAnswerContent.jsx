import React, { useContext } from "react";
import StaffTitleBar from "../../../molecule/staff-title-bar";
import { DepheadAnswerContext } from "./DepheadAnswerStore";
import { Item } from "./Item";
import Pagination from "../../../molecule/pagination";
import { FeedbackModal } from "./FeedbackModal";

export const DepheadAnswerContent = () => {
  const { waitingQuestions, pages, params, setParams } =
    useContext(DepheadAnswerContext);
  return (
    <div>
      <FeedbackModal />
      <StaffTitleBar title={"Câu trả lời chờ duyệt"} />
      <div className="mt-2 grid gap-2">
        {waitingQuestions.map((question) => {
          return <Item key={question._id} data={question} />;
        })}
      </div>
      <div className="mt-2 justify-center flex">
        <Pagination pages={pages} page={params.page} setParams={setParams} />
      </div>
    </div>
  );
};
