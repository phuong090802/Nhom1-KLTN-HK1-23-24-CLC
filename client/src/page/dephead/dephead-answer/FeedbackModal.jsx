import React, { useContext } from "react";
import ModalLayout from "../../../layout/modal-layout";
import { DepheadAnswerContext } from "./DepheadAnswerStore";
import MyRichText from "../../../atom/my-rich-text";
import MyButton from "../../../atom/my-button";
import ModalLayout2 from "../../../layout/modal-layout-2";

export const FeedbackModal = () => {
  const {
    hiddenFeedback,
    setHiddenFeedback,
    feedbackContent,
    setFeedbackContent,
    FeedbackAnswer,
  } = useContext(DepheadAnswerContext);

  return (
    <ModalLayout2
      hidden={hiddenFeedback}
      setHidden={setHiddenFeedback}
      text={"Feedback cho tư vấn viên"}
    >
      <div className="w-72 mt-2">
        <MyRichText
          editorState={feedbackContent}
          setEditorState={setFeedbackContent}
          className={"h-[150px]"}
        />
      </div>
      <div className="flex flex-row-reverse mt-2">
        <MyButton
          className="bg-error hover:opacity-75"
          onClick={FeedbackAnswer}
        >
          Từ chối
        </MyButton>
      </div>
    </ModalLayout2>
  );
};
