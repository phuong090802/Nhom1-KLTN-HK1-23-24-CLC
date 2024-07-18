import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuthSocket } from "../../../hooks/useAuthSocket";
import ModalLayout2 from "../../../layout/modal-layout-2";
import Pagination from "../../../molecule/pagination";
import { getOverDueQuestionCountSv } from "../../../service/dephead/depheadStatistic.sv";
import { DepheadHomeContext } from "./DepheadHomeStore";
import { modalName } from "./const";
import { deleteValueFromArray } from "../../../util/object.util";

export const OverDueQuestionModal = () => {
  const { showingModals, setShowingModals } = useContext(DepheadHomeContext);

  const { authSocket } = useAuthSocket();

  const [params, setParams] = useState({ page: 1 });

  const [pages, setPages] = useState(0);

  const [overDueList, setOverDueList] = useState([]);

  const onModalClose = () => {
    setShowingModals((prev) => deleteValueFromArray(prev, modalName.overDue));
  };

  const remindCounsellor = async (counsellorId) => {
    try {
      const response = await authSocket.emitWithAck(
        "counsellor:reminder:create",
        { counsellorIds: [counsellorId] }
      );
      if (response?.success) {
        toast.success(response?.message || "Gửi nhắc nhở thành công");
      } else {
        toast.error(response?.message || "Gửi nhắc nhở thất bại");
      }
      getOverDueCount();
    } catch (error) {
      // toast.error(error?.message || 'Gửi nhắc nhở thất bại');
    }
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
          {overDueList.length === 0 ? (
            <div className="px-16 py-6 border-2 rounded-lg" >
              <p className="font-bold text-black50">Không có nhân viên nào có câu hỏi quá hạn</p>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </ModalLayout2>
  );
};
