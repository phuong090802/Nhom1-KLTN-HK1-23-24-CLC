import clsx from "clsx";
import { Calendar, Eye, Star } from "lucide-react";
import React, { useContext, useMemo } from "react";
import { toast } from "sonner";
import default_avatar from "../../../assets/image/default_avatar.png";
import { likeSv } from "../../../service/user/userQuestion.sv";
import { DataContext } from "../../../store/DataProvider";
import ModalLayout2 from "../../../layout/modal-layout-2";
import { convertDateTimeToDate } from "../../../util/convert.util";
import { HomePageContext } from "./HomePageStore";
import { colors } from "../../../constance";
import FileComponent from "../../../atom/file-component/FileComponent";

const QuestionDetailModal = () => {
  const {
    hiddenDetailQuestionModal,
    setHiddenDetailQuestionModal,
    selectedData,
    setSelectedData,
  } = useContext(HomePageContext);

  const { darkMode, isLoggedIn } = useContext(DataContext);

  const handleLike = async () => {
    if (!isLoggedIn) {
      toast.warning("Đăng nhập để thích câu hỏi");
      return;
    }
    try {
      await likeSv(selectedData._id);
      setSelectedData((prev) => ({ ...prev, isLiked: !prev.isLiked }));
    } catch (error) {
      toast.error(error?.message || "Có lỗi xảy ra");
    }
  };

  const likeButtonComponent = useMemo(() => {
    return (
      <button
        title="Yêu thích câu hỏi"
        className={clsx("float-right rounded-full p-1", {
          // "bg-warning": selectedData?.isLiked,
          "bg-white": !selectedData?.isLiked,
        })}
        onClick={handleLike}
      >
        <Star
          className="text-warning"
          size={20}
          fill={selectedData?.isLiked ? colors.warning : "#fff"}
        />
      </button>
    );
  }, [selectedData]);

  return (
    <ModalLayout2
      hidden={hiddenDetailQuestionModal}
      setHidden={setHiddenDetailQuestionModal}
    >
      {likeButtonComponent}
      <div className="max-w-4xl mx-auto px-6 mb-8 min-w-[40rem]">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-indigo-600">
            {selectedData?.title}
          </h1>
          <div className="flex items-center gap-2 mt-1 mb-4">
            <div className="flex items-center gap-1 text-sm text-black75">
              <Calendar className="text-black75" size={20} />
              <p>
                {selectedData?.createdAt
                  ? convertDateTimeToDate(selectedData.createdAt)
                  : "createdAt"}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm text-black75">
              <Eye className="text-black75" size={20} />
              <p>{`${selectedData?.views || 0} views`}</p>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Nội dung câu hỏi
          </h2>
          <div className="border-l-4 border-indigo-600 pl-4">
            <p
              className="mt-2 text-gray-700"
              dangerouslySetInnerHTML={{
                __html: selectedData?.content,
              }}
            />
            <div className="mt-2">
              {!selectedData?.fileURL ? (
                <></>
              ) : selectedData.fileURL.includes("png") ||
                selectedData.fileURL.includes("jpg") ? (
                <img
                  className="size-24"
                  src={selectedData?.fileURL}
                  alt="image"
                />
              ) : (
                <FileComponent link={selectedData?.fileURL} />
              )}
            </div>
            <div className="mt-4 flex items-center">
              <img
                className="size-8 rounded-full mr-2 border-primary border-2"
                src={selectedData?.user?.avatar || default_avatar}
                alt="Avatar tác giả"
              />

              <p className="text-sm text-gray-500">
                Tác giả:{" "}
                <span className="font-medium text-gray-800">
                  {selectedData?.user?.fullName}
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
                __html: selectedData?.answer?.content,
              }}
            />
            <div className="mt-2">
              {!selectedData?.answer?.fileURL ? (
                <></>
              ) : selectedData.answer.fileURL.includes("png") ||
                selectedData.answer.fileURL.includes("jpg") ? (
                <img
                  className="size-24"
                  src={selectedData?.answer.fileURL}
                  alt="image"
                />
              ) : (
                <FileComponent link={selectedData?.answer.fileURL} />
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Được trả lời bởi:{" "}
              <span className="font-medium text-gray-800">
                {selectedData?.answer?.user?.fullName}
              </span>
            </p>
          </div>
        </div>
      </div>
    </ModalLayout2>
  );
};

export { QuestionDetailModal };
