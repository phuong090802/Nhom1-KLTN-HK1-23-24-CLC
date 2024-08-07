import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { getQuestionsSv } from "../../../service/counsellor/counsellorQuestion.sv";
import { initParams } from "./constance";

export const CounsellorQuestionContext = createContext({
  questions: Array,
  setQuestion: Function,
  params: Object,
  setParams: Function,
  selected: Boolean,
  setSelected: Function,
  pages: Number,
  setPages: Function,
  hiddenAnswerModal: Boolean,
  setHiddenAnswerModal: Function,
  hiddenSortFilter: Boolean,
  setHiddenSortFilter: Function,
  selectedQuestion: Object,
  setSelectedQuestion: Function,
  hiddenForwardModal: Boolean,
  setHiddenForwardModal: Function,
  getQuestions: Function,
  hiddenDetailQuestionModal: Boolean,
  setHiddenDetailQuestionModal: Function,
  hiddenAssignModal: Boolean,
  setHiddenAssignModal: Function,
});

export const CounsellorQuestionStore = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  const [selected, setSelected] = useState(-1);

  const [params, setParams] = useState(initParams);

  const [pages, setPages] = useState(0);

  const [hiddenAnswerModal, setHiddenAnswerModal] = useState(true);

  const [hiddenForwardModal, setHiddenForwardModal] = useState(true);

  const [hiddenAssignModal, setHiddenAssignModal] = useState(true);

  const [hiddenSortFilter, setHiddenSortFilter] = useState(true);

  const [selectedQuestion, setSelectedQuestion] = useState({});

  const [hiddenDetailQuestionModal, setHiddenDetailQuestionModal] =
    useState(true);

  const getQuestions = async () => {
    try {
      const response = await getQuestionsSv(params);
      setQuestions(response.questions);
      setPages(response.pages);
    } catch (error) {
      toast.error(error?.message || "Lỗi khi lấy danh sách câu hỏi");
    }
  };

  useEffect(() => {
    getQuestions();
  }, [params]);

  return (
    <CounsellorQuestionContext.Provider
      value={{
        questions,
        setQuestions,
        params,
        setParams,
        selected,
        setSelected,
        pages,
        setPages,
        hiddenAnswerModal,
        setHiddenAnswerModal,
        hiddenSortFilter,
        setHiddenSortFilter,
        selectedQuestion,
        setSelectedQuestion,
        hiddenForwardModal,
        setHiddenForwardModal,
        getQuestions,
        hiddenDetailQuestionModal,
        setHiddenDetailQuestionModal,
        hiddenAssignModal,
        setHiddenAssignModal,
      }}
    >
      {children}
    </CounsellorQuestionContext.Provider>
  );
};
