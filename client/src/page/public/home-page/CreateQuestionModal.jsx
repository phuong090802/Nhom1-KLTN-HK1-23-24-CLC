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
  const { hiddenCreateQuestion, setHiddenCreateQuestion, file, setFile } =
    useContext(HomePageContext);

  const [submitQuestion, setSubmitQuestion] = useState(
    EditorState.createEmpty()
  );

  const { authSocket, connected } = useAuthSocket();

  const [title, setTitle] = useState("");

  // useEffect(() => {
  //   console.log(file?.type || null);
  // }, [file]);

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
      const submit = file
        ? {
            departmentId: selectedDep,
            fieldId: selectedField,
            title: title,
            content: draftToHtml(
              convertToRaw(submitQuestion.getCurrentContent())
            ),
            file: {
              buffer: file || null,
              size: file ? file.size : null,
              mimetype: file ? file.type : null,
              originalname: file ? file.name : null,
            },
          }
        : {
            departmentId: selectedDep,
            fieldId: selectedField,
            title: title,
            content: draftToHtml(
              convertToRaw(submitQuestion.getCurrentContent())
            ),
          };
      const response = await authSocket.emitWithAck("question:create", submit);
      setTitle("");
      setSubmitQuestion(EditorState.createEmpty());
      setSelectedDep(null);
      setSelectedField(null);
      setFile(null);
      toast.success(response.message || "Đặt câu hỏi thành công");
    } catch (error) {
      toast.error(error?.message || "Lỗi khi đặt câu hỏi");
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
      <div className="mt-2 py-2 w-[28rem]">
        <div className="px-4">
          <MyInput
            className="font-semibold text-black75 rounded-none border-0 border-b-2 px-0"
            placeholder="Tiêu đề câu hỏi"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="px-4 mt-2">
          <MyRichText
            editorState={submitQuestion}
            setEditorState={setSubmitQuestion}
            className={"border-2 h-[150px] px-0"}
            placeholder={"Nhập nội dung câu hỏi ..."}
          />
        </div>
        <div className="pt-2 px-4">
          <MyFileInput
            value={file}
            onChange={(file) => {
              setFile(file);
            }}
            accept="image/png, image/gif, image/jpeg"
          />
        </div>
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
