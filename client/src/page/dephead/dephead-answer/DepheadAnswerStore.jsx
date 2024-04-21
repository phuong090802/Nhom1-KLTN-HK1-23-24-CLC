import React, { createContext, useEffect, useState } from "react";
import { getWaitingQuestionsSv } from "../../../service/dephead/depheadAnswer.sv";
import { initParams } from "./constance";
import { useAuthSocket } from "../../../hooks/useAuthSocket";
import { EditorState, convertToRaw } from "draft-js";
import { data } from "autoprefixer";
import { useCounsellorSocket } from "../../../hooks/useCounsellorSocket";
import draftToHtml from "draftjs-to-html";

export const DepheadAnswerContext = createContext({
  waitingQuestions: Array,
  pages: Number,
  params: Object,
  setParams: Function,
  selected: String,
  setSelected: Function,
  ApproveAnswer: Function,
  FeedbackAnswer: Function,
  hiddenFeedback: Boolean,
  setHiddenFeedback: Function,
  feedbackContent: EditorState,
  setFeedbackContent: Function,
});

export const DepheadAnswerStore = ({ children }) => {
  const { authSocket } = useAuthSocket();

  const { counsellorSocket } = useCounsellorSocket();

  const [waitingQuestions, setWaitingQuestions] = useState([]);

  const [pages, setPages] = useState(0);

  const [params, setParams] = useState(initParams);

  const [selected, setSelected] = useState("");

  const [hiddenFeedback, setHiddenFeedback] = useState(true);

  const [feedbackContent, setFeedbackContent] = useState(
    EditorState.createEmpty()
  );

  const getWaitingQuestions = async () => {
    try {
      const response = await getWaitingQuestionsSv(params);
      console.log(response.questions);
      setWaitingQuestions(response.questions);
      setPages(response.pages);
    } catch (error) {}
  };

  const ApproveAnswer = async (questionId) => {
    try {
      const response = await authSocket.emitWithAck("approve-answer:create", {
        questionId: questionId,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const FeedbackAnswer = async () => {
    try {
      const response = await counsellorSocket.emitWithAck("feedback:create", {
        questionId: selected,
        content: draftToHtml(convertToRaw(feedbackContent.getCurrentContent())),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWaitingQuestions();
  }, [params]);

  return (
    <DepheadAnswerContext.Provider
      value={{
        waitingQuestions,
        pages,
        params,
        setParams,
        selected,
        setSelected,
        ApproveAnswer,
        hiddenFeedback,
        setHiddenFeedback,
        feedbackContent,
        setFeedbackContent,
        FeedbackAnswer,
      }}
    >
      {children}
    </DepheadAnswerContext.Provider>
  );
};
