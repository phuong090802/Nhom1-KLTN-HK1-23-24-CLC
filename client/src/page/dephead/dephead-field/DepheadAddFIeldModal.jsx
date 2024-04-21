import React, { useContext } from "react";
import { DepheadFieldContext } from "./DepheadFieldStore";
import ModalLayout from "../../../template/modal-layout";
import MyForm from "../../../molecule/my-form";
import { initAddFieldForm } from "./constance";

export const DepheadAddFIeldModal = () => {
  const { hiddenAddField, setHiddenAddField } = useContext(DepheadFieldContext);

  return (
    <ModalLayout
      hidden={hiddenAddField}
      onClose={() => setHiddenAddField(true)}
      title={"Thêm lĩnh vực"}
    >
      <div className="mt-4 w-80 flex flex-col justify-center items-center">
        <MyForm formInitData={initAddFieldForm} submitTitle={"Thêm"} />
      </div>
    </ModalLayout>
  );
};
