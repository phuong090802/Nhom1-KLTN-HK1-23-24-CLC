import { useContext } from 'react';
import { DepheadFaqContext } from './DepheadFaqStore';

export const DepheadFaqTable = () => {
  const { faqs, setSelected, selected, setHiddenDetailFaqModal } =
    useContext(DepheadFaqContext);

  const onDetail = (faq) => {
    setSelected(faq);
    setHiddenDetailFaqModal(false);
  };

  return (
    <table className="min-w-full bg-white mt-2 rounded-xl overflow-hidden shadow-md shadow-black50">
      <thead>
        <tr className="bg-gray-100">
          <th className="border-b border-gray-200 px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Câu hỏi
          </th>
          <th className="border-b border-gray-200 px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Lĩnh vực
          </th>
          <th className="border-b border-gray-200 px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            ACTION
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {faqs?.map((faq, index) => {
          return (
            <tr key={faq?._id || index}>
              <td className="border-b border-gray-200 px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-gray-900">
                  {faq?.question}
                </div>
              </td>
              <td className="border-b border-gray-200 px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-gray-900">
                  {faq?.field?.fieldName}
                </div>
              </td>
              <td className="border-b border-gray-200 px-6 py-4 whitespace-no-wrap">
                <button
                  onClick={() => onDetail(faq)}
                  className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 hover:bg-green-200"
                >
                  Xem chi tiết
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
