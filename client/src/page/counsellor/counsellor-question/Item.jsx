import React, { useContext } from "react";
import ItemLayout from "../../../template/item-layout";
import { CounsellorQuestionContext } from "./CounsellorQuestionStore";
import { MessageCircleQuestion } from "lucide-react";
import { colors } from "../../../constance";
import MyButton from "../../../atom/my-button";
import { DataContext } from "../../../store";
import clsx from "clsx";

export const Item = ({ data }) => {
  const {
    selected,
    setSelected,
    setHiddenAnswerModal,
    setHiddenForwardModal,
    setSelectedQuestion,
  } = useContext(CounsellorQuestionContext);

  const { darkMode } = useContext(DataContext);

  const handleExpand = () => {
    if (selected !== data._id) setSelected(data._id);
    else setSelected(-1);
  };

  const handleResponse = () => {
    setHiddenAnswerModal(false);
    setSelectedQuestion(data);
  };
  const handleForward = () => {
    setHiddenForwardModal(false);
    setSelectedQuestion(data);
  };

  return (
    <ItemLayout
      text={data.title || "Tiêu đề câu hỏi "}
      isSelected={selected === data._id}
      onExpand={handleExpand}
      infor={[data.field]}
    >
      <div>
        <div className="flex flex-row gap-2 px-4 py-2 mt-2 rounded-xl border-2">
          <MessageCircleQuestion color={darkMode ? "#fff" : colors.black75} />
          <div>
            <h1
              className={clsx("font-bold", darkMode ? "#fff" : "text-black75")}
            >
              Câu hỏi
            </h1>
            <p dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
        </div>
        <div className="mt-2 w-full flex flex-row-reverse gap-2">
          <MyButton
            className="bg-primary hover:bg-primary/75 text-white"
            size={"md"}
            onClick={handleResponse}
          >
            Phản hồi
          </MyButton>
          <MyButton
            className="bg-warning hover:bg-warning/75 text-white"
            size={"md"}
            onClick={handleForward}
          >
            Chuyển tiếp
          </MyButton>
        </div>
      </div>
    </ItemLayout>
  );
};
