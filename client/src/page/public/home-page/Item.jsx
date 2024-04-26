import {
  Calendar,
  Eye,
  MessageCircleQuestion,
  MessageCircleReply,
} from "lucide-react";
import React, { useCallback, useContext, useMemo } from "react";
import default_avatar from "../../../assets/image/default_avatar.png";
import { colors } from "../../../constance";
import ItemLayout from "../../../template/item-layout";
import { convertDateTimeToDate } from "../../../util/convert.util";
import { HomePageContext } from "./HomePageStore";

export const Item = ({ data }) => {
  const { selected, setSelected } = useContext(HomePageContext);

  const handleExpand = useCallback(() => {
    if (selected === data._id) setSelected("");
    else setSelected(data._id);
  }, [setSelected, selected]);

  const itemComponent = useMemo(() => {
    const extraInforComponent = (
      <div className="mt-1 flex gap-2">
        <div className="flex items-center gap-1">
          <img
            src={data?.user?.avatar || default_avatar}
            alt="user_avatar"
            className="w-6 h-6 rounded-full border-2 border-primary"
          />
          <p className="text-sm">{data?.user?.fullName || "author name"}</p>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={20} color={colors.black75} />
          <p className="text-sm">
            {data?.createdAt
              ? convertDateTimeToDate(data.createdAt)
              : "createdAt"}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Eye size={20} color={colors.black75} />
          <p className="text-sm">{`${data?.views || 0} views`}</p>
        </div>
      </div>
    );

    const itemContentComponent = (
      <div className="mt-2">
        <div className="flex flex-row gap-2 px-4 py-2 mt-2 rounded-xl border-2">
          <MessageCircleQuestion color={colors.black75} />
          <div>
            <h1 className="font-bold text-black75">Câu hỏi</h1>
            <p>{data.content}</p>
          </div>
        </div>
        <div className="flex flex-row gap-2 px-4 py-2 mt-2 rounded-xl border-2">
          <MessageCircleReply color={colors.black75} />
          <div>
            <h1 className="font-bold text-black75">Phản hồi</h1>
            <p>{data?.answer?.content}</p>
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
      </div>
    );

    return (
      <ItemLayout
        onExpand={handleExpand}
        text={data.title || "Tiêu đề câu hỏi"}
        infor={["Khoa Công Nghệ Thông Tin"]}
        isSelected={selected === data._id}
        extraInforComponent={extraInforComponent}
      >
        {itemContentComponent}
      </ItemLayout>
    );
  }, [data, selected]);

  return itemComponent;
};
