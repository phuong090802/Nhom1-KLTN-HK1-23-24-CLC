import React, { useContext, useState } from "react";
import { DepheadHomeContext } from "./DepheadHomeStore";
import ModalLayout2 from "../../../template/modal-layout-2";

export const FieldStatisticModal = () => {
  const {
    hiddenFieldStatisticModal,
    setHiddenFieldStatisticModal,
    fieldSatisticData,
  } = useContext(DepheadHomeContext);

  return (
    <ModalLayout2
      hidden={hiddenFieldStatisticModal}
      setHidden={setHiddenFieldStatisticModal}
      text={"Thống kê lĩnh vực"}
    >
      <div className="max-h-[50vh] max-w-[60vh] overflow-y-auto mt-2">
        <div
          className="py-1 pr-4 flex justify-between border-b text-primary font-bold" 
        >
          <p>Tên lĩnh vực</p>
          <p className="ml-8">Số câu hỏi</p>
        </div>
        {fieldSatisticData.map((field) => {
          return (
            <div
              key={field.field._id}
              className="py-1 pr-4 flex justify-between border-b"
            >
              <p>{field?.field?.fieldName}</p>
              <p className="ml-8">{field.countOfQuestions}</p>
            </div>
          );
        })}
      </div>
    </ModalLayout2>
  );
};
