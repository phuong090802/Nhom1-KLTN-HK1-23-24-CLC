import React, { useContext, useEffect, useState } from "react";
import ModalLayout2 from "../../../layout/modal-layout-2";
import { CounsellorQuestionContext } from "./CounsellorQuestionStore";
import MyFileInput from "../../../atom/my-file-input";
import MyRichText from "../../../atom/my-rich-text";
import { convertToRaw, EditorState } from "draft-js";
import default_avatar from "../../../assets/image/default_avatar.png";
import MyButton from "../../../atom/my-button";
import { ForwardQuestionModal } from "./ForwardQuestionModal";
import draftToHtml from "draftjs-to-html";
import { useAuthSocket } from "../../../hooks/useAuthSocket";
import { DataContext } from "../../../store";
import { toast } from "sonner";
import FileComponent from "../../../atom/file-component";

export const DetailQuestionModal = () => {
  const {
    hiddenDetailQuestionModal,
    setHiddenDetailQuestionModal,
    selectedQuestion,
    setHiddenForwardModal,
    getQuestions,
  } = useContext(CounsellorQuestionContext);

  const [submitContent, setSubmitContent] = useState(EditorState.createEmpty());

  const [file, setFile] = useState(null);

  const [isPrivate, setIsPrivate] = useState(false);

  const [isApprovalRequest, setIsApprovalRequest] = useState(false);

  const { authSocket } = useAuthSocket();

  const { user } = useContext(DataContext);

  const normalResponse = async () => {
    // const responseData = {
    //   content: draftToHtml(convertToRaw(submitContent.getCurrentContent())),
    //   questionId: selectedQuestion?._id,
    //   isApprovalRequest,
    // };

    const submit = file
      ? {
          content: draftToHtml(convertToRaw(submitContent.getCurrentContent())),
          questionId: selectedQuestion?._id,
          isApprovalRequest,
          file: {
            buffer: file || null,
            size: file ? file.size : null,
            mimetype: file ? file.type : null,
            originalname: file ? file.name : null,
          },
        }
      : {
          content: draftToHtml(convertToRaw(submitContent.getCurrentContent())),
          questionId: selectedQuestion?._id,
          isApprovalRequest,
        };

    try {
      const response = await authSocket.emitWithAck("answer:create", {
        ...submit,
      });
      setSubmitContent(EditorState.createEmpty());
      setHiddenDetailQuestionModal(true);
      getQuestions();
      toast.success(response.message || "Phản hồi câu hỏi thành công");
    } catch (error) {
      toast.error(error?.message || "Lỗi khi phản hồi câu hỏi");
    }
  };

  const privateResponse = async () => {
    const responseData = {
      messageContent: draftToHtml(
        convertToRaw(submitContent.getCurrentContent())
      ),
      questionId: selectedQuestion?._id,
    };
    try {
      const response = await authSocket.emitWithAck(
        "conversation:create",
        responseData
      );
      toast.success(response.message || "Phản hồi câu hỏi thành công");
      setSubmitContent(EditorState.createEmpty());
      setHiddenDetailQuestionModal(true);
      getQuestions();
    } catch (error) {
      toast.error(error?.message || "Lỗi khi phản hồi câu hỏi");
    }
  };

  useEffect(() => {
    setSubmitContent(EditorState.createEmpty());
  }, [selectedQuestion]);

  const handleResponse = async () => {
    if (!isPrivate) normalResponse();
    else privateResponse();
  };

  return (
    <ModalLayout2
      hidden={hiddenDetailQuestionModal}
      setHidden={setHiddenDetailQuestionModal}
    >
      <ForwardQuestionModal />
      <div className="max-w-4xl mx-auto px-6 mb-8 min-w-[40rem]">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-indigo-600">
            {selectedQuestion?.title}
          </h1>
          <h2 className="text-xl font-semibold text-gray-800">
            Nội dung câu hỏi
          </h2>
          <div className="border-l-4 border-indigo-600 pl-4">
            <p
              className="mt-2 text-gray-700"
              dangerouslySetInnerHTML={{
                __html: selectedQuestion?.content,
              }}
            />
            <div className="mt-2">
              {!selectedQuestion?.fileURL ? (
                <></>
              ) : selectedQuestion.fileURL.includes("png") ||
                selectedQuestion.fileURL.includes("jpg") ? (
                <img
                  className="size-24"
                  src={selectedQuestion?.fileURL}
                  alt="image"
                />
              ) : (
                <FileComponent link={selectedQuestion?.fileURL} />
              )}
            </div>
            <div className="mt-4 flex items-center">
              <img
                className="size-8 rounded-full mr-2 border-primary border-2"
                src={selectedQuestion?.user?.avatar || default_avatar}
                alt="Avatar tác giả"
              />

              <p className="text-sm text-gray-500">
                Tác giả:{" "}
                <span className="font-medium text-gray-800">
                  {selectedQuestion?.user?.fullName}
                </span>
              </p>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Trả lời câu hỏi</h2>

        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-black75 ml-2 ">Riêng tư:</h1>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
          </div>
          {user?.role === "COUNSELLOR" && !isPrivate && (
            <div className="flex items-center gap-2">
              <h1 className="text-black75 ml-2 ">Yêu cầu duyệt:</h1>
              <input
                type="checkbox"
                checked={isApprovalRequest}
                onChange={(e) => setIsApprovalRequest(e.target.checked)}
              />
            </div>
          )}
        </div>
        <div className="px-4 mt-2">
          <MyRichText
            editorState={submitContent}
            setEditorState={setSubmitContent}
            className={"border-2 h-[150px] px-0"}
            placeholder={"Nhập nội dung câu hỏi ..."}
          />
        </div>
        {!isPrivate && (
          <div className="pt-2 px-4">
            <MyFileInput
              value={file}
              onChange={(file) => {
                setFile(file);
              }}
            />
          </div>
        )}
      </div>
      <div className="flex flex-row-reverse mx-10 gap-4">
        <MyButton className="bg-primary" size={"md"} onClick={handleResponse}>
          Phản hồi
        </MyButton>
        <MyButton
          className="bg-primary"
          size={"md"}
          onClick={() => {
            setHiddenForwardModal(false);
          }}
        >
          Chuyển tiếp
        </MyButton>
      </div>
    </ModalLayout2>
  );
};
