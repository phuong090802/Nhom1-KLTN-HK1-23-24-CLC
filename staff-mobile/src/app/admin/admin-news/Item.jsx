import React, { useContext } from "react";
import ItemLayout from "../../../component/molecule/item-layout/ItemLayout";
import { AdminNewsContext } from "./AdminNewsProvider";

export const Item = ({ data }) => {
  const { setShowDetailModal, setSelectedNews } = useContext(AdminNewsContext);

  const onDetail = () => {
    setShowDetailModal(true);
    setSelectedNews(data);
  };

  return <ItemLayout text={data?.title} onDetail={onDetail} />;
};
