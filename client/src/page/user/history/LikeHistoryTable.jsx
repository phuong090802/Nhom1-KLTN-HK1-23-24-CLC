import React, { useContext } from "react";
import { HistoryContext } from "./HistoryStore";
import { convertDateTimeToDate } from "../../../util/convert.util";
import Pagination from "../../../molecule/pagination";

export const LikeHistoryTable = () => {
  const {
    likedQuestions,
    likedParams,
    setLikedParams,
    likePages,
    setSelectedQuestion,
    setHiddenDetailQuestionModal,
  } = useContext(HistoryContext);

  const onDetail = (questionId) => {
    // console.log("questionId", questionId);
    setSelectedQuestion(questionId);
    setHiddenDetailQuestionModal(false);
  };

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 mt-2 rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ngày
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Tiêu đề
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Tình trạng
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {likedQuestions?.map((question, index) => (
            <tr
              key={question?._id || index}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {convertDateTimeToDate(question?.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate">
                {question?.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button
                  className="hover:text-primary hover:underline duration-200"
                  onClick={() => {
                    onDetail(question);
                  }}
                >
                  Xem chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-center mt-4">
        <Pagination
          page={likedParams?.page || 0}
          pages={likePages}
          setParams={setLikedParams}
        />
      </div>
    </>
  );
};
