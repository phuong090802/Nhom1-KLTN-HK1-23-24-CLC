import { MessageCircleQuestion, SendHorizontal } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import MySelect from "../../../atom/my-select";
import MyButton from "../../../atom/my-button";
import { colors } from "../../../constance";
import { toast } from "sonner";
import {
  getDepartmentsListSv,
  getFieldListSv,
} from "../../../service/public/department.sv";
import ModalLayout from "../../../template/modal-layout";
import ModalLayout2 from "../../../template/modal-layout-2";
import { CounsellorQuestionContext } from "./CounsellorQuestionStore";
import { forwardQuestionSv } from "../../../service/counsellor/counsellorQuestion.sv";

export const ForwardQuestionModal = () => {
  const {
    hiddenForwardModal,
    setHiddenForwardModal,
    selectedQuestion,
    setHiddenDetailQuestionModal,
    getQuestions,
  } = useContext(CounsellorQuestionContext);

  const [depList, setDepList] = useState([]);

  const [fieldList, setFieldList] = useState([]);

  const [selectedDep, setSelectedDep] = useState("");

  const [selectedField, setSelectedField] = useState("");

  const getDepList = async () => {
    try {
      const response = await getDepartmentsListSv();
      const rawData = response.departments;
      const convertData = rawData.map((data) => {
        return {
          key: data.departmentName || "unknow department",
          value: data._id,
        };
      });
      setDepList(convertData);
    } catch (error) {
      console.log(error);
    }
  };

  const getFieldList = async () => {
    try {
      const response = await getFieldListSv(selectedDep);
      const rawData = response.fields;
      const convertData = rawData.map((data) => {
        return {
          key: data.fieldName || "unknow field",
          value: data._id,
        };
      });
      setFieldList(convertData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFoward = async () => {
    if (!selectedDep || !selectedField) {
      toast.warning("Vui lòng chọn khoa và lĩnh vực");
      return;
    }
    try {
      const response = await forwardQuestionSv(selectedQuestion._id, {
        departmentId: selectedDep,
        fieldId: selectedField,
      });
      setHiddenDetailQuestionModal(true);
      setHiddenForwardModal(true);
      getQuestions();
      toast.success(response?.message || "Chuyển tiếp câu trả lời thành công");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Lỗi khi chuyển tiếp câu hỏi");
    }
  };

  useEffect(() => {
    getDepList();
  }, []);
  useEffect(() => {
    if (!selectedDep) return;
    getFieldList();
  }, [selectedDep]);

  return (
    <ModalLayout2 setHidden={setHiddenForwardModal} hidden={hiddenForwardModal}>
      <div className="w-96 mt-2">
        <div className="flex flex-col gap-2 border p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800">Chuyển đến</h2>
          <div className="flex-col flex gap-4 h-56">
            <MySelect
              variant={"default"}
              boxHeight={40}
              placeholder="Chọn khoa"
              className="w-full "
              value={selectedDep}
              data={depList}
              onChange={(value) => setSelectedDep(value)}
            />
            <MySelect
              variant={"default"}
              boxHeight={40}
              placeholder="Chọn lĩnh vực"
              className="w-full"
              value={selectedField}
              data={fieldList}
              onChange={(value) => setSelectedField(value)}
            />
          </div>
          <MyButton
            className="bg-primary hover:bg-primary/75 float-right mt-1"
            size={"md"}
            onClick={handleFoward}
          >
            <p className="flex justify-center items-center gap-2 font-semibold">
              Chuyển
              <SendHorizontal size={20} />
            </p>
          </MyButton>
        </div>
      </div>
    </ModalLayout2>
  );
};
