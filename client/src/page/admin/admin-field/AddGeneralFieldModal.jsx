import React, { useContext, useState } from "react";
import ModalLayout2 from "../../../layout/modal-layout-2";
import { AdminFieldContext } from "./AdminFieldStore";
import { initAddFieldForm, modalName } from "./const";
import MyForm from "../../../molecule/my-form";
import { addGeneralFieldSv } from "../../../service/admin/adminField.sv";
import { toast } from "sonner";

export const AddGeneralFieldModal = () => {
  const { showingModal, setShowingModal, getGeneralField } =
    useContext(AdminFieldContext);

  //   const [loading, setLoading] = useState()

  const addGeneralField = async (data) => {
    try {
      const response = await addGeneralFieldSv(data);
      toast.success(response?.message || "Thêm lĩnh vực thành công");
      getGeneralField();
    } catch (error) {
      toast.error("Lỗi khi thêm lĩnh vực chung");
    }
  };
  
  return (
    <ModalLayout2
      hidden={!showingModal.includes(modalName.addGeneralField)}
      text={"Thêm lĩnh vực chung"}
      onClose={() => {
        setShowingModal((prev) =>
          prev.filter((modal) => modal !== modalName.addGeneralField)
        );
      }}
    >
      <div className="mt-4 w-80 flex flex-col justify-center items-center">
        <MyForm
          formInitData={initAddFieldForm}
          submitTitle={"Thêm"}
          onSubmit={addGeneralField}
        />
      </div>
    </ModalLayout2>
  );
};
