import ModalLayout2 from "../../../template/modal-layout-2";
import default_avatar from "../../../assets/image/default_avatar.png";
import { useContext } from "react";
import { CounsellorFeedbackContext } from "./CounsellorFeedbackStore";
import MyButton from "../../../atom/my-button";
import { Trash2 } from "lucide-react";

export const DetailFeedbackModal = () => {
  const {
    hiddenDetailFeedbackModal,
    setHiddenDetailFeedbackModal,
    selectedFeedback,
    deleteFeedback,
  } = useContext(CounsellorFeedbackContext);

  return (
    <ModalLayout2
      hidden={hiddenDetailFeedbackModal}
      setHidden={setHiddenDetailFeedbackModal}
    >
      <div className="max-w-4xl mx-auto px-6 mb-8 min-w-[40rem]">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-indigo-600 mb-4">
            {selectedFeedback?.question?.title}
          </h1>
          <h2 className="text-xl font-semibold text-gray-800">
            Nội dung câu hỏi
          </h2>
          <div className="border-l-4 border-indigo-600 pl-4">
            <p
              className="mt-2 text-gray-700"
              dangerouslySetInnerHTML={{
                __html: selectedFeedback?.question?.content,
              }}
            />

            <div className="mt-4 flex items-center">
              <img
                className="size-8 rounded-full mr-2"
                src={default_avatar}
                alt="Avatar tác giả"
              />
              <p className="text-sm text-gray-500">
                Tác giả:{" "}
                <span className="font-medium text-gray-800">Nguyễn Văn A</span>
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
                __html: selectedFeedback?.answer?.content,
              }}
            />
            <p className="mt-2 text-sm text-gray-500">
              Được trả lời bởi:{" "}
              <span className="font-medium text-gray-800">Trần Thị B</span>
            </p>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Trưởng khoa phản hồi
          </h2>
          <div className="border-l-4 border-orange-600 pl-4 mt-4">
            <p
              className="mt-2 text-gray-700"
              dangerouslySetInnerHTML={{
                __html: selectedFeedback?.content,
              }}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <MyButton
            className="bg-error hover:bg-error/75"
            size={"md"}
            onClick={deleteFeedback}
          >
            <div className="flex gap-2">
              <Trash2 />
              Xóa
            </div>
          </MyButton>
        </div>
      </div>
    </ModalLayout2>
  );
};
