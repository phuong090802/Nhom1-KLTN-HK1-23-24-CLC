import FAQ from '../../../../models/faq.js';
import ErrorHandler from '../../../../util/error/http-error-handler.js';
import catchAsyncErrors from '../../catch-async-errors.js';

export const handleCheckFAQBelongDepartment = catchAsyncErrors(
  (req, res, next) => {
    const faq = req.foundFAQ;
    const user = req.user;
    const { department: departmentOfUser } = user.counsellor;
    const departmentOfFAQ = faq.department;
    if (!departmentOfUser.equals(departmentOfFAQ)) {
      return next(
        new ErrorHandler(400, 'Câu hỏi chung không thuộc về khoa', 4102)
      );
    }
    next();
  }
);

// Kiểm tra faq có tồn tại trong db không bằng id được truyền vào
export const handleValidateFAQId = (location = 'params', key = 'id') => {
  return catchAsyncErrors(async (req, res, next) => {
    const id = req[location][key];
    const faq = await FAQ.findById(id);
    if (!faq) {
      return next(new ErrorHandler(404, 'Không tìm thấy câu hỏi chung', 4101));
    }
    req.foundFAQ = faq;
    next();
  });
};
