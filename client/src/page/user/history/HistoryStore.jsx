import React, { createContext, useEffect, useState } from "react";
import {
  getLikeHistorySv,
  getQuestionByIdSv,
  getQuestionHistorySv,
} from "../../../service/user/userQuestion.sv";
import { toast } from "sonner";
import { initParams } from "./constance";

export const HistoryContext = createContext({
  historyQuestions: Array,
  setHistoryQuestion: Function,
  likedQuestions: Array,
  setLikedQuestion: Function,
  historyParams: Object,
  setHistoryParams: Function,
  likedParams: Object,
  setLikedParams: Function,
  historyPages: Number,
  likePages: Number,
  selectedQuestion: Object,
  setSelectedQuestion: Function,
  hiddenDetailQuestionModal: Object,
  setHiddenDetailQuestionModal: Function,
});

export const HistoryStore = ({ children }) => {
  const [historyQuestions, setHistoryQuestion] = useState([]);

  const [likedQuestions, setLikedQuestion] = useState([]);

  const [historyParams, setHistoryParams] = useState(initParams);

  const [historyPages, setHistoryPages] = useState(1);

  const [likedParams, setLikedParams] = useState(initParams);

  const [likePages, setLikePages] = useState(1);

  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const [hiddenDetailQuestionModal, setHiddenDetailQuestionModal] = useState(true);

  const getQuestionHistory = async () => {
    try {
      const response = await getQuestionHistorySv(historyParams);
      setHistoryQuestion(response.questions);
      setHistoryPages(response?.pages || 0);
    } catch (error) {
      toast.error(error?.message || "Lỗi khi lấy lịch sử câu hỏi");
    }
  };

  const getLikeHistory = async () => {
    try {
      const response = await getLikeHistorySv(likedParams);
      console.log("liked", response);
      setLikedQuestion(response?.questions);
      setLikePages(response?.pages || 0);
    } catch (error) {
      toast(error?.message || "Lỗi lấy danh sách câu hỏi yêu thích");
    }
  };



  useEffect(() => {
    getQuestionHistory();
  }, [historyParams]);

  useEffect(() => {
    getLikeHistory();
  }, [likedParams]);



  return (
    <HistoryContext.Provider
      value={{
        historyQuestions,
        setHistoryQuestion,
        likedQuestions,
        setLikedQuestion,
        historyParams,
        setHistoryParams,
        likedParams,
        setLikedParams,
        likePages,
        historyPages,
        selectedQuestion,
        setSelectedQuestion,hiddenDetailQuestionModal, setHiddenDetailQuestionModal
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
