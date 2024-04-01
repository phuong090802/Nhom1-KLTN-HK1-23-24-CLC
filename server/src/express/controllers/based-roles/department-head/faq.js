import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';
import FAQ from '../../../../models/faq.js';
import queryFiltersLimit from '../../../../utils/db/query-filters-limit.js';
import QueryAPI from '../../../../utils/db/query-api.js';
import paginate from '../../../../utils/db/paginate.js';
import ErrorHandler from '../../../../utils/error/http-error-handler.js';
import { deleteFile } from '../../../../utils/upload-file.js';

// Endpoint: /api/department-head/faqs
// Method: GET
// Description: Trưởng khoa lấy danh sách câu hỏi chung (phân trang, lọc lĩnh vực của khoa, tìm kiếm)
export const handleGetFAQs = catchAsyncErrors(async (req, res, next) => {
  const { department } = req.user.counsellor;

  const query = FAQ.find()
    .populate({
      path: 'field',
      select: 'fieldName',
    })
    .select('question answer answerAttachment field createdAt')
    .lean();

  const filterDepartment = { department: department._id };

  const requestQuery = queryFiltersLimit(req.query, filterDepartment);

  const queryAPI = new QueryAPI(query, requestQuery).search().filter().sort();
  let faqRecords = await queryAPI.query;
  const numberOfFAQs = faqRecords.length;
  faqRecords = await queryAPI.pagination().query.clone();

  const {
    data: retFAQs,
    page,
    pages,
  } = paginate(numberOfFAQs, req.query.page, req.query.size, faqRecords);

  const faqs = retFAQs.map((faq) => ({
    ...faq,
    answerAttachment: faq.answerAttachment.url,
  }));

  res.json({
    success: true,
    faqs,
    page,
    pages,
    code: 2061,
  });
});

// Endpoint: /api/department-head/faqs/:id
// Method: DELETE
// Description: Trưởng khoa xóa câu hỏi chung
export const handleDeleteFAQ = catchAsyncErrors(async (req, res, next) => {
  const faq = req.foundFAQ;
  const { ref, url } = faq.answerAttachment;

  if (ref && url) {
    try {
      // remove file
      await deleteFile(ref);
    } catch (error) {
      return next(
        new ErrorHandler(500, 'Lỗi xóa câu hỏi chung. Vui lòng thử lại', 4104)
      );
    }
  }

  await FAQ.findByIdAndDelete(faq._id);

  res.json({
    success: true,
    message: 'Xóa câu hỏi chung thành công',
    code: 2066,
  });
});

// Endpoint: /api/department-head/faqs/:id
// Method: PUT
// Description: Trưởng khoa cập nhật câu hỏi chung
export const handleUpdateFAQ = catchAsyncErrors(async (req, res, next) => {
  const faq = req.foundFAQ;
  const field = req.foundField;
  const { ref, url } = faq.answerAttachment;
  const answerAttachment = req.uploadedFile;

  // check if have news file and it have old attachment remove
  // doing noting
  if (ref && url) {
    try {
      // remove file
      await deleteFile(ref);
    } catch (error) {
      // remove new image if error
      if (answerAttachment.ref && answerAttachment.url) {
        await deleteFile(answerAttachment.ref);
      }
      const msg = 'Lỗi cập nhật câu hỏi chung. Vui lòng thử lại';
      return next(new ErrorHandler(500, msg, 4103));
    }
  }
  faq.field = field;
  faq.answerAttachment = answerAttachment;

  await faq.save();

  res.json({
    success: true,
    message: 'Cập nhật câu hỏi chung thành công',
    code: 2067,
  });
});

// Endpoint: /api/department-head/faqs
// Method: POST
// Description: Trưởng khoa tạo câu hỏi chung
export const handleCreateFAQ = catchAsyncErrors(async (req, res, next) => {
  const department = req.foundDepartment;
  const field = req.foundField;
  const { question, answer } = req.body;
  const answerAttachment = req.uploadedFile;

  await FAQ.create({ question, answer, field, department, answerAttachment });

  res.status(201).json({
    success: true,
    message: 'Tạo câu hỏi chung thành công',
    code: 2068,
  });
});
