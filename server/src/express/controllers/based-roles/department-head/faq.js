import FAQ from '../../../../models/faq.js';
import handlePagination from '../../../../util/db/pagination.js';
import QueryAPI from '../../../../util/db/query-api.js';
import QueryTransform from '../../../../util/db/query-transform.js';
import ErrorHandler from '../../../../util/error/http-error-handler.js';
import { deleteFile } from '../../../../util/upload-file.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/department-head/faqs
// Method: GET
// Description: Trưởng khoa lấy danh sách câu hỏi chung (phân trang, lọc lĩnh vực của khoa, tìm kiếm, sắp xếp)
export const handleGetFAQs = catchAsyncErrors(async (req, res, next) => {
  const { department } = req.user.counsellor;
  const query = FAQ.find()
    .populate({
      path: 'field',
      select: 'fieldName',
    })
    .select('question answer answerAttachment field createdAt')
    .lean();
  const queryTransform = new QueryTransform(req.query).applyFilters({
    department: department._id,
  });
  const queryAPI = new QueryAPI(query, queryTransform.query)
    .search()
    .filter()
    .sort();
  const {
    records: retFAQs,
    page,
    pages,
  } = await handlePagination(queryAPI, req.query.size, req.query.page);
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
      await FAQ.deleteOne({ _id: faq._id });
    } catch (error) {
      return next(
        new ErrorHandler(500, 'Lỗi xóa câu hỏi chung. Vui lòng thử lại', 4104)
      );
    }
  }
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
      faq.field = field;
      faq.answerAttachment = answerAttachment;
      await faq.save();
    } catch (error) {
      // remove new image if error
      if (answerAttachment.ref && answerAttachment.url) {
        await deleteFile(answerAttachment.ref);
      }
      const msg = 'Lỗi cập nhật câu hỏi chung. Vui lòng thử lại';
      return next(new ErrorHandler(500, msg, 4103));
    }
  }

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
