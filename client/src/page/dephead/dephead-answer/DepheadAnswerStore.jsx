import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuthSocket } from '../../../hooks/useAuthSocket';
import { getWaitingQuestionsSv } from '../../../service/dephead/depheadAnswer.sv';
import { initParams } from './constance';

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
  hiddenDetailAnswerModal: Boolean,
  setHiddenDetailAnswerModal: Function,
});

export const DepheadAnswerStore = ({ children }) => {
  const { authSocket } = useAuthSocket();

  const [waitingQuestions, setWaitingQuestions] = useState([]);

  const [pages, setPages] = useState(0);

  const [params, setParams] = useState(initParams);

  const [selected, setSelected] = useState(null);

  const [hiddenFeedback, setHiddenFeedback] = useState(true);

  const [hiddenDetailAnswerModal, setHiddenDetailAnswerModal] = useState(true);

  const [feedbackContent, setFeedbackContent] = useState(
    EditorState.createEmpty()
  );

  const getWaitingQuestions = async () => {
    try {
      const response = await getWaitingQuestionsSv(params);
      setWaitingQuestions(response.questions);
      setPages(response.pages);
    } catch (error) {}
  };

  const ApproveAnswer = async (questionId) => {
    try {
      const response = await authSocket.emitWithAck('approve-answer:create', {
        questionId: questionId,
      });
      console.log('ApproveAnswer', response);
      if (response.success) {
        toast.success(response?.message || 'Duyệt câu trả lời thành công');
      } else {
        toast.error(response?.message || 'Lỗi khi duyệt câu trả lời');
      }

      setHiddenDetailAnswerModal(true);
      getWaitingQuestions();
    } catch (error) {
      // toast.error(error?.message || 'Lỗi khi duyệt câu trả lời');
    }
  };

  const FeedbackAnswer = async () => {
    try {
      const response = await authSocket.emitWithAck('feedback:create', {
        questionId: selected,
        content: draftToHtml(convertToRaw(feedbackContent.getCurrentContent())),
      });
      console.log('FeedbackAnswer', response);
      if (response?.success) {
        toast.success(response?.message || 'Phản hồi câu trả lời thành công');
      } else {
        toast.error(response?.message || 'Lỗi khi phản hồi câu trả lời');
      }
      setHiddenDetailAnswerModal(true);
      setHiddenFeedback(true);
      getWaitingQuestions();
    } catch (error) {
      // toast.error(error?.message || 'Lỗi khi phản hồi câu trả lời');
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
        hiddenDetailAnswerModal,
        setHiddenDetailAnswerModal,
      }}
    >
      {children}
    </DepheadAnswerContext.Provider>
  );
};
