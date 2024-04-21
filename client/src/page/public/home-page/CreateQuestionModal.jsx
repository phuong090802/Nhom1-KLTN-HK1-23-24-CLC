import React, { useContext, useEffect, useState } from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import { HomePageContext } from "./HomePageStore";
import MySelect from "../../../atom/my-select";
import MyRichText from "../../../atom/my-rich-text";
import MyButton from "../../../atom/my-button";
import MyInput from "../../../atom/my-input";
import { EditorState, convertToRaw } from "draft-js";
import useDepartmentField from "../../../hooks/useDepartmentField";
import { useAuthSocket } from "../../../hooks/useAuthSocket";
import draftToHtml from "draftjs-to-html";
import { toast } from "sonner";
import MyFileInput from "../../../atom/my-file-input";

export const CreateQuestionModal = ({ hidden }) => {
  const { hiddenCreateQuestion, setHiddenCreateQuestion } =
    useContext(HomePageContext);

  const [submitQuestion, setSubmitQuestion] = useState(
    EditorState.createEmpty()
  );

  const { authSocket, connected } = useAuthSocket();

  const [title, setTitle] = useState("");

  const {
    deps,
    fields,
    selectedDep,
    setSelectedDep,
    selectedField,
    setSelectedField,
  } = useDepartmentField();

  const createQuestion = async () => {
    try {
      const response = await authSocket.emitWithAck("question:create", {
        departmentId: selectedDep,
        fieldId: selectedField,
        title: draftToHtml(convertToRaw(submitQuestion.getCurrentContent())),
        content: title,
      });
      console.log(response);
      toast.success(response.message || "Đặt câu hỏi thành công");
    } catch (error) {
      toast.error(error.message || "Lỗi khi đặt câu hỏi");
    }
  };

  return (
    <ModalLayout
      hidden={hiddenCreateQuestion}
      onClose={() => setHiddenCreateQuestion(true)}
    >
      <div className="px-4 mt-2 flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <label htmlFor="" className="text-base">
            Khoa:
          </label>
          <div className="inline-block w-4/5">
            <MySelect
              boxHeight={32}
              variant={"underline"}
              placeholder="Chọn khoa"
              className="w-full"
              data={deps}
              onChange={setSelectedDep}
              value={selectedDep}
            />
          </div>
        </div>
        <div className="flex justify-between items-end">
          <label htmlFor="" className="text-base">
            Lĩnh vực:
          </label>
          <div className="inline-block w-4/5">
            <MySelect
              boxHeight={32}
              variant={"underline"}
              placeholder="Chọn Lĩnh vực"
              className="w-full"
              data={fields}
              value={selectedField}
              onChange={setSelectedField}
            />
          </div>
        </div>
      </div>
      <div className="mt-2 border-y py-2 w-96">
        <MyInput
          className="border-x-0 border-t-0 rounded-none border-b pb-2 font-semibold text-black75"
          placeholder="Tiêu đề câu hỏi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <MyRichText
          editorState={submitQuestion}
          setEditorState={setSubmitQuestion}
          className={"border-none px-4 h-[150px]"}
        />
        {/* <div className="pt-2 px-4 border-t">
          <MyFileInput />
        </div> */}
      </div>
      <div className="p-2">
        <MyButton
          className="bg-primary"
          size={"fullWidth"}
          onClick={createQuestion}
        >
          Đặt câu hỏi
        </MyButton>
      </div>
    </ModalLayout>
  );
};

const ModalLayout = ({ children, hidden, onClose }) => {
  return (
    <div
      className={clsx(
        "fixed top-0 bottom-0 left-0 right-0 bg-black25 flex justify-center items-center z-50 backdrop-blur-sm",
        hidden && "hidden"
      )}
    >
      <div className="min-w-96 min-h-48 bg-white rounded-2xl">
        <div className="py-2 border-b flex justify-center items-center relative">
          <p className="text-xl font-bold text-black75">Đặt câu hỏi</p>
          <X
            className="bg-black25 rounded-full p-1 hover:bg-black/15 absolute right-4 w-8 h-8 cursor-pointer"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
};
