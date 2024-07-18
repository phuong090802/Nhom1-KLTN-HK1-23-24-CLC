import React, { useContext, useEffect, useState } from "react";
import ModalLayout2 from "../../../layout/modal-layout-2/ModalLayout2";
import { CounsellorQuestionContext } from "./CounsellorQuestionStore";
import { getCounsellorToAssignSv } from "../../../service/dephead/depheadQuestion.sv";
import clsx from "clsx";
import MyButton from "../../../atom/my-button";
import { useAuthSocket } from "../../../hooks/useAuthSocket";
import { toast } from "sonner";

export const AssignModal = () => {
  const {
    hiddenAssignModal,
    setHiddenAssignModal,
    selectedQuestion,
    getQuestions,
  } = useContext(CounsellorQuestionContext);

  const { authSocket } = useAuthSocket();

  const [counsellors, setCounsellors] = useState([]);

  const [selectedCounsellorId, setSelectedCounsellorId] = useState(null);

  const getCounsellorToAssign = async () => {
    try {
      const response = await getCounsellorToAssignSv();
      setCounsellors(response.counsellors);
    } catch (error) {}
  };

  const assignWork = async () => {
    const response = await authSocket.emitWithAck(
      "counsellor:assign-work:create",
      {
        questionId: selectedQuestion._id,
        counsellorId: selectedCounsellorId,
      }
    );
    getQuestions();
    if (response.success) {
      toast.success("Phân công câu hỏi thành công");
      setHiddenAssignModal(true);
    } else {
      toast.error("Lỗi khi phân công");
    }
  };

  useEffect(() => {
    getCounsellorToAssign();
  }, []);

  return (
    <ModalLayout2 hidden={hiddenAssignModal} setHidden={setHiddenAssignModal}>
      <h1 className="font-bold text-black50">Danh sách tư vấn viên:</h1>
      <div className="border rounded-lg overflow-hidden">
        <div className="w-96 max-h-96 overflow-y-auto">
          {counsellors.length === 0 ? (
            <div className="p-6 flex justify-center">
              Không tư vấn viên nào!!
            </div>
          ) : (
            counsellors.map((counsellor, index) => {
              return (
                <div
                  className={
                    (clsx(
                      "py-2 hover:bg-primary/20 cursor-pointer duration-300"
                    ),
                    counsellor.counsellor._id === selectedCounsellorId
                      ? "bg-primary/20"
                      : "bg-transparent")
                  }
                  key={counsellor._id || index}
                  onClick={() =>
                    setSelectedCounsellorId(counsellor.counsellor._id)
                  }
                >
                  <div className="flex justify-between py-2">
                    <p className="pl-4 pr-8 text-black75">
                      {counsellor.counsellor.fullName}
                    </p>
                    <p className="mr-4">{counsellor.countOfAssignQuestions}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="mt-2 flex flex-row-reverse">
        <MyButton className="bg-primary" size={"md"} onClick={assignWork}>
          Phân công
        </MyButton>
      </div>
    </ModalLayout2>
  );
};
