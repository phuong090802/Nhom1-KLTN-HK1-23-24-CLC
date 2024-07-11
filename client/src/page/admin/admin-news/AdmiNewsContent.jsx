import React, { useContext } from "react";
import TitleBar from "../../../molecule/title-bar";
import StaffTitleBar from "../../../molecule/staff-title-bar";
import no_image from "../../../assets/image/no_image.jpg";
import { AdminNewsContext } from "./AdminNewsStore";
import { convertDateTimeToDate } from "../../../util/convert.util";
import { NewsTable } from "./NewsTable";
import { DetailNewsModal } from "./DetailNewsModal";
import { AddNewsModal } from "./AddNewsModal";

export const AdmiNewsContent = () => {
  const { setHiddenAddNewsModal, setParams } = useContext(AdminNewsContext);

  return (
    <>
      <AddNewsModal />
      <DetailNewsModal />
      <StaffTitleBar
        title={"Quản lý tin tức"}
        onAdd={() => {
          setHiddenAddNewsModal(false);
        }}
        setParams={setParams}
      />
      <NewsTable />
    </>
  );
};
