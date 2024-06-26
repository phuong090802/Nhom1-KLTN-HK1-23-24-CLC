import React, { useContext } from "react";
import ItemLayout from "../../../template/item-layout";
import { colors } from "../../../constance";
import { MessageCircleReply, Paperclip, Calendar } from "lucide-react";
import { NewsPageContext } from "./NewsPageStore";
import { convertDateTimeToDate } from "../../../util/convert.util";

export const Item = ({ data }) => {
  const { selected, setSelected } = useContext(NewsPageContext);

  const handleExpand = () => {
    if (selected === data._id) setSelected("");
    else setSelected(data._id);
  };
  return (
    <ItemLayout
      text={data.title || "Tiêu đề "}
      isSelected={selected === data._id}
      onExpand={handleExpand}
      extraInforComponent={
        <div className="flex items-center gap-1">
          <Calendar size={20} color={colors.black75} />
          <p className="text-sm">
            {data?.createdAt
              ? convertDateTimeToDate(data.createdAt)
              : "createdAt"}
          </p>
        </div>
      }
    >
      <div className="flex flex-row gap-2 px-4 py-2 mt-2 rounded-xl border-2">
        <MessageCircleReply color={colors.black75} />
        <div>
          <h1 className="font-bold text-black75">Phản hồi</h1>
          <p>{data?.content}</p>
          {!!data.file &&
            (data?.file?.includes(".png") ? (
              <img
                src={data.file}
                alt=""
                className="w-40 mt-2 border rounded-xl border-black"
              />
            ) : (
              <a
                href={data.file}
                className="flex items-center border px-2 py-1 w-fit rounded-xl gap-2 cursor-pointer hover:bg-primary/10 mt-2"
                target="_blank"
              >
                <Paperclip size={16} />
                <p>File đính kèm</p>
              </a>
            ))}
        </div>
      </div>
    </ItemLayout>
  );
};

const file = () => {
  return <div></div>;
};
