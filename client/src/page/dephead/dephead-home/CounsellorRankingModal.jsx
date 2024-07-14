import React, { useContext, useEffect, useState } from "react";
import ModalLayout2 from "../../../layout/modal-layout-2";
import { DepheadHomeContext } from "./DepheadHomeStore";
import { modalName } from "./const";
import { deleteValueFromArray } from "../../../util/object.util";
import { getRankingCounsellorSv } from "../../../service/dephead/depheadStatistic.sv";
import default_avatar from "../../../assets/image/default_avatar.png";

export const CounsellorRankingModal = () => {
  const { showingModals, setShowingModals } = useContext(DepheadHomeContext);

  const [rankingList, setRankingList] = useState([]);

  const onModalClose = () => {
    setShowingModals((prev) =>
      deleteValueFromArray(prev, modalName.counsellorRanking)
    );
  };

  const getRankingList = async () => {
    try {
      const response = await getRankingCounsellorSv();
      setRankingList(response.rankingCounsellor || []);
      // console.log(response);
    } catch (error) {}
  };

  useEffect(() => {
    getRankingList();
  }, []);

  const rankingData = [
    { name: "Alice", score: 95 },
    { name: "Bob", score: 85 },
    { name: "Charlie", score: 80 },
    // more data...
  ];

  return (
    <ModalLayout2
      hidden={!showingModals?.includes(modalName.counsellorRanking)}
      onClose={onModalClose}
      text={"Xếp hạng tư vấn viên"}
    >
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="min-w-full py-2 align-middle">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Xếp hạng
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Avatar
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tư vấn viên
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Câu hỏi đã trả lời
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rankingList.map((data, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={data?.counsellor?.avatar?.url || default_avatar}
                          alt={`${data?.cousellor?.fullName}'s avatar`}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {data.counsellor.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {data.countOfAnsweredQuestions}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ModalLayout2>
  );
};
