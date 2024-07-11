import React, { useContext } from "react";
import ModalLayout2 from "../../../template/modal-layout-2";
import { AdminHomeContext } from "./AdminHomeStore";

export const DepartmentStatisticModal = () => {
  const { hiddenDepStatistic, setHiddenDepStatistic } =
    useContext(AdminHomeContext);

  return (
    <ModalLayout2 hidden={hiddenDepStatistic} setHidden={setHiddenDepStatistic}>
      DepartmentStatisticModal
    </ModalLayout2>
  );
};
