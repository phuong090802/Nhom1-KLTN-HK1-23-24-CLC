import React, { useContext, useState } from "react";
import { DepheadHomeContext } from "./DepheadHomeStore";
import ModalLayout2 from "../../../layout/modal-layout-2";
import { modalName } from "./const";
import { deleteValueFromArray } from "../../../util/object.util";

export const FieldStatisticModal = () => {
  const { fieldSatisticData, showingModals, setShowingModals } =
    useContext(DepheadHomeContext);

  return (
    <ModalLayout2
      hidden={!showingModals.includes(modalName.fieldStatistic)}
      onClose={() =>
        setShowingModals((prev) =>
          deleteValueFromArray(prev, modalName.fieldStatistic)
        )
      }
      text={"Thống kê lĩnh vực"}
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
                      Lĩnh vực
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Số câu hỏi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fieldSatisticData.map((field, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {field?.field?.fieldName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {field.countOfQuestions}
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
