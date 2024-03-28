import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

import QueryAPI from '../../../util/db/query-api.js';
import paginateResults from '../../../util/db/pagination.js';

import FAQ from '../../../models/faq.js';

// endpoint: /api/faqs
// method: GET
// description: Lấy danh sách câu hỏi chung (phân trang, lọc theo khoa, lĩnh vực của khoa, tìm kiếm)
export const faqsHandler = catchAsyncErrors(async (req, res, next) => {
  const query = FAQ.find()
    // .lean()
    // don't use learn for method
    .select('question answer answerAttachment field department createdAt');

  const queryAPI = new QueryAPI(query, req.query).search().filter().sort();
  let faqRecords = await queryAPI.query;
  const numberOfFAQs = faqRecords.length;
  faqRecords = await queryAPI.pagination().query.clone();

  const {
    data: retFAQs,
    page,
    pages,
  } = paginateResults(numberOfFAQs, req.query.page, req.query.size, faqRecords);

  const faqs = await Promise.all(
    retFAQs.map(async (faq) => {
      return await faq.userRequestFAQInformation();
    })
  );

  res.json({
    success: true,
    faqs,
    page,
    pages,
    code: 2060,
  });
});
