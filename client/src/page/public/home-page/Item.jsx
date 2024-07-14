import {
  Calendar,
  Eye,
  MessageCircleQuestion,
  MessageCircleReply,
} from "lucide-react";
import React, { useCallback, useContext, useMemo } from "react";
import default_avatar from "../../../assets/image/default_avatar.png";
import { colors, darkModeCss } from "../../../constance";
import ItemLayout from "../../../layout/item-layout";
import { convertDateTimeToDate } from "../../../util/convert.util";
import { HomePageContext } from "./HomePageStore";
import { DataContext } from "../../../store";
import clsx from "clsx";
import { increaseViewSv } from "../../../service/public/question.sv";

export const Item = ({ data }) => {
  const {
    setHiddenDetailQuestionModal,
    selectedData,
    setSelectedData,
    setQuestions,
  } = useContext(HomePageContext);

  const { darkMode } = useContext(DataContext);

  const increaseView = async () => {
    try {
      const response = await increaseViewSv(data._id);
      setQuestions((prev) => {
        return prev.map((question) => {
          if (question._id === data._id) {
            return { ...question, views: question.views + 1 };
          } else return question;
        });
      });
    } catch (error) {
      // console.log(error);
    }
  };

  // const handleExpand = useCallback(() => {
  //   if (selected === data._id) setSelected("");
  //   else setSelected(data._id);
  // }, [setSelected, selected]);

  const handleInfor = useCallback(() => {
    setHiddenDetailQuestionModal(false);
    if (selectedData?._id !== data._id) {
      increaseView();
      setSelectedData(data);
    }
  }, [selectedData, data]);

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
          <Calendar size={20} color={darkMode ? "#fff" : colors.black75} />
          <p className="text-sm">
            {data?.createdAt
              ? convertDateTimeToDate(data.createdAt)
              : "createdAt"}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Eye size={20} color={darkMode ? "#fff" : colors.black75} />
          <p className="text-sm">{`${data?.views || 0} views`}</p>
        </div>
      </div>
    );

    // const itemContentComponent = useMemo(() => {
    //   return (
    //     <div className="mt-2">
    //       <div
    //         className={clsx(
    //           "flex flex-row gap-2 px-4 py-2 mt-2 rounded-xl border-2",
    //           darkMode && darkModeCss
    //         )}
    //       >
    //         <MessageCircleQuestion color={darkMode ? "#fff" : colors.black75} />
    //         <div>
    //           <h1 className="font-bold ">Câu hỏi</h1>
    //           <p
    //             dangerouslySetInnerHTML={{
    //               __html: data.content || "Question Not Found",
    //             }}
    //           />
    //         </div>
    //       </div>
    //       <div className="flex flex-row gap-2 px-4 py-2 mt-2 rounded-xl border-2">
    //         <MessageCircleReply color={darkMode ? "#fff" : colors.black75} />
    //         <div>
    //           <h1 className="font-bold ">Phản hồi</h1>
    //           <p
    //             dangerouslySetInnerHTML={{
    //               __html: data?.answer?.content || "Question Not Found",
    //             }}
    //           />
    //           <div className="flex items-center gap-1">
    //             <p className="text-sm">Phản hồi từ</p>
    //             <img
    //               src={data?.user?.avatar || default_avatar}
    //               alt="user_avatar"
    //               className="w-6 h-6 rounded-full border-2 border-primary"
    //             />
    //             <p className="text-sm font-semibold">
    //               {data?.answer?.user?.fullName || "counsellor name"}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // });

    return (
      <ItemLayout
        onInfor={handleInfor}
        // onExpand={handleExpand}
        text={data.title || "Tiêu đề câu hỏi"}
        infor={["Khoa Công Nghệ Thông Tin"]}
        // isSelected={selected === data._id}
        extraInforComponent={extraInforComponent}
      >
        {/* {itemContentComponent} */}
      </ItemLayout>
    );
  }, [data, darkMode, selectedData]);

  return itemComponent;
};
