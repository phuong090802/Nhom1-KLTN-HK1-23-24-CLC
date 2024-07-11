import React, { Children, createContext, useEffect, useState } from "react";
import {
  deleteFeedbackSv,
  getFeedbacksSv,
} from "../../../service/counsellor/counsellorFeedback.sv";
import { toast } from "sonner";
import { initParams } from "./constance";

export const CounsellorFeedbackContext = createContext({
  feedbacks: Array,
  setFeedbacks: Function,
  selectedFeedback: Object,
  setSelectedFeedback: Function,
  hiddenDetailFeedbackModal: Boolean,
  setHiddenDetailFeedbackModal: Function,
  deleteFeedback: Function,
  // params: Object,
  // setParams: Function,
  // pages: Number,
});

export const CounsellorFeedbackStore = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  const [selectedFeedback, setSelectedFeedback] = useState({});

  const [hiddenDetailFeedbackModal, setHiddenDetailFeedbackModal] =
    useState(true);

  // const [params, setParams] = useState(initParams);

  // const [pages, setPages] = useState(0);

  const getFeedbacks = async () => {
    try {
      const response = await getFeedbacksSv();
      console.log(response)
      // setPages(response?.pages || 0);
      setFeedbacks(response?.feedbacks);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFeedback = async () => {
    try {
      const response = await deleteFeedbackSv(selectedFeedback._id);
      setFeedbacks((prev) => {
        return prev.filter((feedback) => feedback._id !== selectedFeedback._id);
      });
      setSelectedFeedback([]);
      setHiddenDetailFeedbackModal(true);
      toast.success(response?.message || "Xóa feedback thành công");
    } catch (error) {
      toast.success(error?.message || "Lỗi khi xóa feedback");
    }
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <CounsellorFeedbackContext.Provider
      value={{
        // pages,
        // params,
        // setParams,
        feedbacks,
        setFeedbacks,
        deleteFeedback,
        selectedFeedback,
        setSelectedFeedback,
        hiddenDetailFeedbackModal,
        setHiddenDetailFeedbackModal,
      }}
    >
      {children}
    </CounsellorFeedbackContext.Provider>
  );
};
