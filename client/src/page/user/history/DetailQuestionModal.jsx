import React, { useContext, useEffect, useState } from "react";
import { HistoryContext } from "./HistoryStore";
import { getQuestionByIdSv } from "../../../service/user/userQuestion.sv";
import FileComponent from "../../../atom/file-component/FileComponent";
import ModalLayout2 from "../../../layout/modal-layout-2";
import { Calendar, Eye } from "lucide-react";
import default_avatar from "../../../assets/image/default_avatar.png"
import { convertDateTimeToDate } from "../../../util/convert.util";

export const DetailQuestionModal = () => {
  const {
    setHiddenDetailQuestionModal,
    hiddenDetailQuestionModal,
    selectedQuestion,
  } = useContext(HistoryContext);

//   const [questionDetail, setQuestionDetail] = useState(null);

//   const getQuestionById = async () => {
//     try {
//       console.log(selectedQuestion);
//       const response = await getQuestionByIdSv(selectedQuestion._id);
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getQuestionById();
//   }, [selectedQuestion]);

//   useEffect(() => {
//     if (selectedQuestion) getQuestionById();
//   }, [selectedQuestion]);

  return (
    <ModalLayout2
      hidden={hiddenDetailQuestionModal}
      setHidden={setHiddenDetailQuestionModal}
    >
      {/* {likeButtonComponent} */}
      <div className="max-w-4xl mx-auto px-6 mb-8 min-w-[40rem]">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-indigo-600">
            {selectedQuestion?.title}
          </h1>
          <div className="flex items-center gap-2 mt-1 mb-4">
            <div className="flex items-center gap-1 text-sm text-black75">
              <Calendar className="text-black75" size={20} />
              <p>
                {selectedQuestion?.createdAt
                  ? convertDateTimeToDate(selectedQuestion.createdAt)
                  : "createdAt"}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm text-black75">
              <Eye className="text-black75" size={20} />
              <p>{`${selectedQuestion?.views || 0} views`}</p>
            </div>
          </div>
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

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Nội dung phản hồi
          </h2>
          <div className="border-l-4 border-green-600 pl-4 mt-4">
            <p
              className="mt-2 text-gray-700"
              dangerouslySetInnerHTML={{
                __html: selectedQuestion?.answer?.content,
              }}
            />
            <div className="mt-2">
              {!selectedQuestion?.answer?.fileURL ? (
                <></>
              ) : selectedQuestion.answer.fileURL.includes("png") ||
                selectedQuestion.answer.fileURL.includes("jpg") ? (
                <img
                  className="size-24"
                  src={selectedQuestion?.answer.fileURL}
                  alt="image"
                />
              ) : (
                <FileComponent link={selectedQuestion?.answer.fileURL} />
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Được trả lời bởi:{" "}
              <span className="font-medium text-gray-800">
                {selectedQuestion?.answer?.user?.fullName}
              </span>
            </p>
          </div>
        </div>
      </div>
    </ModalLayout2>
  );
};
