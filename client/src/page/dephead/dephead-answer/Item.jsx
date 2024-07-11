import React, { useContext } from "react";
import ItemLayout from "../../../template/item-layout";
import { MessageCircleQuestion, MessageCircleReply } from "lucide-react";
import { colors, darkModeCss } from "../../../constance";
import default_avatar from "../../../assets/image/default_avatar.png";
import { DepheadAnswerContext } from "./DepheadAnswerStore";
import MyButton from "../../../atom/my-button";
import { DataContext } from "../../../store";
import clsx from "clsx";

export const Item = ({ data }) => {
  const { selected, setSelected, ApproveAnswer, setHiddenFeedback } =
    useContext(DepheadAnswerContext);

  const { darkMode } = useContext(DataContext);

  const handleExpand = () => {
    if (selected === data._id) {
      setSelected("");
    } else setSelected(data._id);
  };

  return (
    <ItemLayout
      text={data.title}
      isSelected={selected === data._id}
      onExpand={handleExpand}
    >
      <div>
        <div className="flex flex-row gap-2 px-4 py-2 mt-2 rounded-xl border-2">
          <MessageCircleQuestion color={darkMode ? "#fff" : colors.black75} />
          <div>
            <h1
              className={clsx(
                "font-bold",
                darkMode ? "text-white" : "text-black75"
              )}
            >
              Câu hỏi
            </h1>
            <p>{data.content}</p>
          </div>
        </div>
        <div className="flex flex-row gap-2 px-4 py-2 mt-2 rounded-xl border-2">
          <MessageCircleReply color={darkMode ? "#fff" : colors.black75} />
          <div>
            <h1
              className={clsx(
                "font-bold",
                darkMode ? "text-white" : "text-black75"
              )}
            >
              Phản hồi
            </h1>
            <p dangerouslySetInnerHTML={{ __html: data?.answer?.content }} />
            <div className="flex items-center gap-1">
              <p className="text-sm">Phản hồi từ</p>
              <img
                src={data?.user?.avatar || default_avatar}
                alt="user_avatar"
                className="w-6 h-6 rounded-full border-2 border-primary"
              />
              <p className="text-sm font-semibold">
                {data?.answer?.user?.fullName || "counsellor name"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse mt-2 gap-2">
          <MyButton
            className="bg-success hover:opacity-75"
            size={"md"}
            onClick={() => ApproveAnswer(data._id)}
          >
            Duyệt
          </MyButton>
          <MyButton
            className="bg-error hover:opacity-75"
            size={"md"}
            onClick={() => setHiddenFeedback(false)}
          >
            Từ chối
          </MyButton>
        </div>
      </div>
    </ItemLayout>
  );
};
