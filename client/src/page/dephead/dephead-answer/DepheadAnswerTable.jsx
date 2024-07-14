import { useContext } from 'react';
import { convertDateTimeToDate } from '../../../util/convert.util';
import { DepheadAnswerContext } from './DepheadAnswerStore';

export const DepheadAnswerTable = () => {
  const { waitingQuestions, setSelected, setHiddenDetailAnswerModal } =
    useContext(DepheadAnswerContext);

  console.log('waitingQuestions', waitingQuestions);

  const onDetail = (question) => {
    setSelected(question);
    setHiddenDetailAnswerModal(false);
  };

  return (
    <table className="min-w-full bg-white mt-2 rounded-xl overflow-hidden shadow-md shadow-black50">
      <thead>
        <tr className="bg-gray-100">
          <th className="border-b border-gray-200 px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Ngày
          </th>
          <th className="border-b border-gray-200 px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Tiêu đề
          </th>
          <th className="border-b border-gray-200 px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {waitingQuestions?.map((question, index) => {
          return (
            <tr key={question?._id || index}>
              <td className="border-b border-gray-200 px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-gray-900">
                  {convertDateTimeToDate(question?.createdAt)}
                </div>
              </td>
              <td className="border-b border-gray-200 px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-gray-900">
                  {question?.title || 'Tiêu đề câu hỏi'}
                </div>
              </td>
              <td className="border-b border-gray-200 px-6 py-4 whitespace-no-wrap">
                <button
                  onClick={() => onDetail(question)}
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
