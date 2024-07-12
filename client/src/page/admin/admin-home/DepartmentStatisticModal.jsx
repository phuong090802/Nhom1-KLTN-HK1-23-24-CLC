import React, { useContext, useEffect, useState } from "react";
import ModalLayout2 from "../../../template/modal-layout-2";
import { AdminHomeContext } from "./AdminHomeStore";
import { getOverDueQuestionsSv } from "../../../service/admin/adminStatistic";
import { convertDateTimeToDate } from "../../../util/convert.util";
import Pagination from "../../../molecule/pagination/Pagination";
import { useAuthSocket } from "../../../hooks/useAuthSocket";
import { toast } from "sonner";

export const DepartmentStatisticModal = () => {
  const { hiddenDepStatistic, setHiddenDepStatistic } =
    useContext(AdminHomeContext);
  const initParams = {
    page: 1,
  };
  const { authSocket } = useAuthSocket();

  const [params, setParams] = useState(initParams);

  const [dueQuestions, setDueQuestions] = useState([]);

  const [pages, setPages] = useState(0);

  const getOverDueQuestions = async () => {
    try {
      const response = await getOverDueQuestionsSv(params);
      setDueQuestions(response.departmentsWithOverDueQuestion);
      setPages(response?.pages);
    } catch (error) {
      console.log(response);
    }
  };

  const remindDepartment = async (depId) => {
    try {
      const response = authSocket.emitWithAck("department:reminder:create", {
        departmentIds: [depId],
      });
      toast.success(response?.message || "Đã nhắc nhở đến khoa");
    } catch (error) {
      toast.error("Lỗi khi nhắc nhở khoa");
    }
  };

  useEffect(() => {
    getOverDueQuestions();
  }, []);

  return (
    <ModalLayout2
      hidden={hiddenDepStatistic}
      setHidden={setHiddenDepStatistic}
      text={"Danh sách các câu hỏi quá hạn"}
    >
      {dueQuestions?.length === 0 ? (
        <div className="p-16 border border-black50 rounded-lg">
          <p className="text-lg text-black50">
            Không có khoa nào có câu hỏi quá hạn
          </p>
        </div>
      ) : (
        <>
          <table className="min-w-full bg-white mt-2 rounded-xl overflow-hidden shadow-md shadow-black50">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-b border-gray-200 px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Tên khoa
                </th>
                <th className="border-b border-gray-200 px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Số câu hỏi quá hạn
                </th>
                <th className="border-b border-gray-200 px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dueQuestions?.map((question, index) => {
                return (
                  <tr key={question?._id || index}>
                    <td className="border-b border-gray-200 px-6 py-4 whitespace-no-wrap">
                      <div className="text-sm leading-5 text-gray-900">
                        {question?.departmentName}
                      </div>
                    </td>
                    <td className="border-b border-gray-200 px-6 py-4 whitespace-no-wrap">
                      <div className="text-sm leading-5 text-gray-900">
                        {question?.totalOverDueQuestion || "Tiêu đề câu hỏi"}
                      </div>
                    </td>
                    <td className="border-b border-gray-200 px-6 py-4 whitespace-no-wrap">
                      <button
                        onClick={() => remindDepartment(question?._id)}
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 hover:bg-green-200"
                      >
                        Nhắc nhở
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="my-2 w-full flex justify-center items-center">
            <Pagination
              page={params.page}
              pages={pages}
              setParams={setParams}
            />
          </div>
        </>
      )}
    </ModalLayout2>
  );
};
