import React, { useContext, useMemo, useState } from "react";
import BottomModalLayout from "../../../layout/bottom-modal-layout/BottomModalLayout";
import { AdminStaffContext } from "./AdminStaffStore";
import MyButton from "../../../atom/my-button";
import { ArrowLeft, FileUp, UserPlus } from "lucide-react";
import { colors } from "../../../constance";
import { SingleAddForm } from "./SingleAddForm";
import { MultiAddForm } from "./MultiAddForm";
import ModalLayout2 from "../../../layout/modal-layout-2";

export const AddStaffModal = () => {
  const { hiddenAddStaffModal, setHiddenAddStaffModal } =
    useContext(AdminStaffContext);

  const [addMode, setAddMode] = useState("");

  const selectModeComponent = useMemo(() => {
    return (
      <div className="flex justify-evenly py-2 gap-4">
        <MyButton
          className="border-primary border hover:bg-primary/25"
          size={"xl"}
          onClick={() => setAddMode("single")}
        >
          <div className="flex justify-center items-center gap-1">
            <UserPlus color={colors.black75} />
            <p className="text-black75">Thêm một người</p>
          </div>
        </MyButton>
        <MyButton
          className="border-primary border hover:bg-primary/25"
          size={"xl"}
          onClick={() => setAddMode("multi")}
        >
          <div className="flex justify-center items-center gap-1">
            <FileUp color={colors.black75} />
            <p className="text-black75">Thêm nhiều người</p>
          </div>
        </MyButton>
      </div>
    );
  }, [setAddMode]);

  return (
    <ModalLayout2
      hidden={hiddenAddStaffModal}
      setHidden={setHiddenAddStaffModal}
      title={"Thêm nhân viên"}
    >
      {addMode === "" ? (
        selectModeComponent
      ) : (
        <div className="pt-2 min-w-96">
          <button
            className="hover:underline flex justify-center items-center"
            onClick={() => setAddMode("")}
          >
            <ArrowLeft color={colors.black75} size={18} />
            <p className="font-bold text-lg text-black75">Trở lại</p>
          </button>
          {addMode === "single" ? <SingleAddForm /> : <MultiAddForm />}
        </div>
      )}
    </ModalLayout2>
  );
};
