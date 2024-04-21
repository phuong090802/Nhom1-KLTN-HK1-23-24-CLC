import React, { useContext } from "react";
import ModalLayout from "../../../template/modal-layout";
import { DepheadCounsellorContext } from "./DepheadCounsellorStore";
import MyForm from "../../../molecule/my-form";
import { initAddCounsellorForm } from "./constance";

export const DepheadAddCounsellorModal = () => {
  const { setHiddenAddCounsellor, hiddenAddCounsellor, depheadAddCounsellor } =
    useContext(DepheadCounsellorContext);

  return (
    <ModalLayout
      hidden={hiddenAddCounsellor}
      onClose={() => setHiddenAddCounsellor(true)}
      title={"Thêm tư vấn viên"}
    >
      <div className="mt-4 w-80 flex flex-col justify-center items-center">
        <MyForm
          formInitData={initAddCounsellorForm}
          onSubmit={depheadAddCounsellor}
        />
      </div>
    </ModalLayout>
  );
};
