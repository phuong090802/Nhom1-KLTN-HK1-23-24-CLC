import React, { useContext } from "react";
import ItemLayout from "../../../component/molecule/item-layout/ItemLayout";
import { CounsellorQuestionContext } from "./CounsellorQuestionProvider";

export const Item = ({ data }) => {
  const { setShowDetailModal, setSelectedQuestion } = useContext(
    CounsellorQuestionContext
  );
  const onDetail = () => {
    setSelectedQuestion(data);
    setShowDetailModal(true);
  };
  return <ItemLayout text={data.title} onDetail={onDetail} />;
};
