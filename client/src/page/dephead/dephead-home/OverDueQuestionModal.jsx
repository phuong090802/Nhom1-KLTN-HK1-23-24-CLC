import React, { useContext, useEffect, useState } from "react";
import ModalLayout from "../../../layout/modal-layout";
import ModalLayout2 from "../../../layout/modal-layout-2";
import { DepheadHomeContext } from "./DepheadHomeStore";
import { modalName } from "./const";
import { getOverDueQuestionCountSv } from "../../../service/dephead/depheadStatistic.sv";
import Pagination from "../../../molecule/pagination";
import { useAuthSocket } from "../../../hooks/useAuthSocket";
import { toast } from "sonner";

export const OverDueQuestionModal = () => {
  const { showingModals, setShowingModals } = useContext(DepheadHomeContext);

  const { authSocket } = useAuthSocket();

  const [params, setParams] = useState({ page: 1 });

  const [pages, setPages] = useState(0);

  const [overDueList, setOverDueList] = useState([]);

  const onModalClose = () => {
    setShowingModals((prev) => {
      const index = prev.indexOf(modalName.overDue);
      return prev.splice(index, 1);
    });
  };

  const remindCounsellor = async (counsellorId) => {
    try {
      const response = await authSocket.emitWithAck(
        "counsellor:reminder:create",
        { counsellorIds: [counsellorId] }
      );
      toast.success(response?.message || "Gửi nhắc nhở thành công");
      getOverDueCount();
    } catch (error) {}
  };

  const getOverDueCount = async () => {
    try {
      const response = await getOverDueQuestionCountSv(params);
      setOverDueList(response?.usersWithOverDueQuestion || []);
      setPages(response.pages || 0);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getOverDueCount();
  }, [params]);

  return (
    <ModalLayout2
      hidden={!showingModals.includes(modalName.overDue)}
      onClose={onModalClose}
      text={"Danh sách các nhân viên có câu hỏi quá hạn"}
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
                      Họ & Tên
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      SỐ CÂU HỎI QUÁ HẠN
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {overDueList.map((counsellor, index) => (
                    <tr key={counsellor?._id || index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {counsellor?.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {counsellor?.totalOverDueQuestion}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button
                          onClick={() => remindCounsellor(counsellor?._id)}
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 hover:bg-green-200"
                        >
                          Nhắc nhở
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center items-center mt-2">
              <Pagination
                page={params.page}
                pages={pages}
                setParams={setParams}
              />
            </div>
          </div>
        </div>
      </div>
    </ModalLayout2>
  );
};
