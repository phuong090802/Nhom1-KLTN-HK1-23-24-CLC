import { useContext } from "react";
import StaffTitleBar from "../../../molecule/staff-title-bar";
import { DetailFeedbackModal } from "./DetailFeedbackModal";
import { FeedbackTable } from "./FeedbackTable";
import { CounsellorFeedbackContext } from "./CounsellorFeedbackStore";

export const CounsellorFeedbackContent = () => {
  const { feedbacks } = useContext(CounsellorFeedbackContext);
  return (
    <>
      <DetailFeedbackModal />
      <StaffTitleBar title={"Phản hồi từ trưởng khoa"} />
      {feedbacks?.length === 0 ? (
        <div className="bg-white p-12 flex justify-center items-center border-2 mt-2 border-black50 rounded-xl">
          <p className="text-xl text-black50">Không có phản hồi nào</p>
        </div>
      ) : (
        <FeedbackTable />
      )}
    </>
  );
};
