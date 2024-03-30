import ErrorHandler from '../../../../../utils/error/socket-io-error-handler.js';

// Kiểm tra lĩnh vực của tư vấn viên có hỗ trợ câu hỏi không
export const handleValidateFieldOfCounsellor = (
  fieldOfQuestion,
  counsellor
) => {
  if (!counsellor.counsellor.fields.includes(fieldOfQuestion)) {
    throw new ErrorHandler('Bạn không hỗ trợ lĩnh vực này', 4097);
  }
};
