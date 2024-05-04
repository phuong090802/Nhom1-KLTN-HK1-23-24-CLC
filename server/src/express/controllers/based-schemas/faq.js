import FAQ from '../../../models/faq.js';
import handlePagination from '../../../util/db/pagination.js';
import QueryAPI from '../../../util/db/query-api.js';
import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

// Endpoint: /api/faqs
// Method: GET
// Description: Lấy danh sách câu hỏi chung (phân trang, lọc theo khoa, lĩnh vực của khoa, tìm kiếm)
export const handleGetFAQs = catchAsyncErrors(async (req, res, next) => {
  const query = FAQ.find()
    .populate({ path: 'field', select: '-_id fieldName' })
    .populate({ path: 'department', select: '-_id departmentName' })
    .select('question answer answerAttachment field department createdAt')
    .lean();
  const queryAPI = new QueryAPI(query, req.query).search().filter().sort();
  const {
    records: retFAQs,
    page,
    pages,
  } = await handlePagination(queryAPI, req.query.size, req.query.page);
  const faqs = retFAQs.map((faq) => ({
    ...faq,
    answerAttachment: faq.answerAttachment.url,
    department: faq.department.departmentName,
    field: faq.field.fieldName,
  }));
  res.json({
    success: true,
    faqs,
    page,
    pages,
    code: 2060,
  });
});
