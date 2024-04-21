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
import { CounsellorQuestionContext } from "./CounsellorQuestionStore";
import { forwardQuestionSv } from "../../../service/counsellor/counsellorQuestion.sv";

export const ForwardQuestionModal = () => {
  const { hiddenForwardModal, setHiddenForwardModal, selectedQuestion } =
    useContext(CounsellorQuestionContext);

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
      console.log(response);
    } catch (error) {
      console.log(error);
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
    <ModalLayout
      onClose={() => setHiddenForwardModal(true)}
      hidden={hiddenForwardModal}
      title={"Chuyển tiếp câu hỏi"}
    >
      <div className="w-96 mt-2">
        <div className="overflow-hidden rounded-xl border mb-2">
          <div className="px-4 py-2 max-h-40 overflow-y-auto flex flex-col gap-2">
            <div className="flex flex-row">
              <MessageCircleQuestion color={colors.black75} />
              <h1 className="font-bold text-black75 ml-2">Câu hỏi</h1>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: selectedQuestion.content || "Question Not Found",
              }}
            />
            <div className="">
              <p className="text-xs border inline-block px-2 rounded-md bg-light_gray text-black75">
                {selectedQuestion.field || "unknow field"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 border p-4 rounded-lg ">
          <h1 className="font-semibold text-lg">Chuyển đến:</h1>
          <MySelect
            variant={"default"}
            boxHeight={40}
            placeholder="Chọn khoa"
            className="w-full"
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
          <MyButton
            className="bg-warning hover:bg-warning/75 float-right mt-1"
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
    </ModalLayout>
  );
};
