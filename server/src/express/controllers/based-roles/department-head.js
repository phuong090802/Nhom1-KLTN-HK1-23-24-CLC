import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

import QueryAPI from '../../../util/db/query-api.js';
import paginateResults from '../../../util/db/pagination.js';
import ErrorHandler from '../../../util/error/http-error-handler.js';
import { deleteFile } from '../../../util/upload-file.js';

import Field from '../../../models/field.js';
import User from '../../../models/user.js';
import Question from '../../../models/question.js';
import FAQ from '../../../models/faq.js';

// endpoint: /api/faqs
// method: GET
// description: Trưởng khoa lấy danh sách câu hỏi chung (phân trang, lọc lĩnh vực của khoa, tìm kiếm)
export const faqsHandler = catchAsyncErrors(async (req, res, next) => {
  const { department } = req.user.counsellor;

  const query = FAQ.find({ department })
    .populate({
      path: 'field',
      select: 'fieldName',
    })
    // .lean()
    // don't use learn for method
    .select('question answer answerAttachment department field createdAt');

  const queryAPI = new QueryAPI(query, req.query).search().filter().sort();
  let faqRecords = await queryAPI.query;
  const numberOfFAQs = faqRecords.length;
  faqRecords = await queryAPI.pagination().query.clone();

  const {
    data: retFAQs,
    page,
    pages,
  } = paginateResults(numberOfFAQs, req.query.page, req.query.size, faqRecords);

  const faqs = retFAQs.map((faq) => faq.departmentHeadRequestFAQInformation());

  res.json({
    success: true,
    faqs,
    page,
    pages,
    code: 2061,
  });
});

// endpoint: /api/department-head/faqs/:id
// method: DELETE
// description: Trưởng khoa xóa câu hỏi chung
export const deleteFAQHandler = catchAsyncErrors(async (req, res, next) => {
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

// endpoint: /api/department-head/faqs/:id
// method: PUT
// description: Trưởng khoa cập nhật câu hỏi chung
export const updateFAQHandler = catchAsyncErrors(async (req, res, next) => {
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
      await deleteFile(answerAttachment.ref);
      return next(
        new ErrorHandler(
          500,
          'Lỗi cập nhật câu hỏi chung. Vui lòng thử lại',
          4103
        )
      );
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

// endpoint: /api/department-head/faqs
// method: POST
// description: Trưởng khoa tạo câu hỏi chung
export const createFAQHandler = catchAsyncErrors(async (req, res, next) => {
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

// endpoint: /api/department-head/answers
// method: GET
// description: Trưởng khoa kiểm tra có câu hỏi cần trả lời hay không
export const unapprovedAnswerExistsHandler = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.user;
    const { department } = user.counsellor;

    const numberOfAnswers = await Question.countDocuments({
      department,
      status: 'publicly-answered-pending-approval',
    });

    res.json({
      success: true,
      unapprovedAnswerExists: numberOfAnswers > 0,
      code: 2059,
    });
  }
);

// endpoint: /api/department-head/questions/unanswered-question
// method: GET
// description: Trưởng khoa kiểm tra có câu hỏi cần trả lời hay không
export const unansweredQuestionHandler = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.user;
    const { department } = user.counsellor;

    const numberOfQuestions = await Question.countDocuments({
      department,
      status: 'unanswered',
    });

    res.json({
      success: true,
      hasNewQuestions: numberOfQuestions > 0,
      code: 2071,
    });
  }
);

// endpoint: /api/department-head/counsellors/:id
// method: PATCH
// description: Khóa/mở khóa tư vấn viên
export const updateIsEnabledCounsellorHandler = catchAsyncErrors(
  async (req, res, next) => {
    const counsellor = req.foundCounsellor;
    counsellor.isEnabled = req.body.isEnabled;
    const savedUser = await counsellor.save();

    const newStrIsEnabled = savedUser.isEnabled ? 'Mở khóa' : 'Khóa';
    res.json({
      success: true,
      message: newStrIsEnabled + ' tài khoản thành công',
      code: 2044,
    });
  }
);

// endpoint: /api/department-head/counsellors/:id
// method: PATCH
// description: Cập nhật (xóa) lĩnh vực cho tư vấn viên
export const removeFieldOfCounsellor = catchAsyncErrors(
  async (req, res, next) => {
    const field = req.foundField;
    const updateCounsellor = req.foundCounsellor;

    const updatedField = updateCounsellor.counsellor.fields.filter(
      (fieldId) => !fieldId.equals(field._id)
    );

    updateCounsellor.counsellor.fields = updatedField;

    await updateCounsellor.save();

    res.json({
      success: true,
      message: 'Xóa lĩnh vực của tư vấn viên thành công',
      code: 2043,
    });
  }
);

// endpoint: /api/department-head/counsellors
// method: POST
// description: Thêm tư vấn viên cho khoa
export const addCounsellorToDepartment = catchAsyncErrors(
  async (req, res, next) => {
    const { fullName, email, phoneNumber, password, confirmPassword } =
      req.body;

    const mergePassword = JSON.stringify({ password, confirmPassword });

    const department = req.foundDepartment;
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: mergePassword,
      'counsellor.department': department,
      role: 'COUNSELLOR',
    });

    res.status(201).json({
      success: true,
      message: 'Thêm tư vấn viên thành công',
      code: 2042,
    });
  }
);

// endpoint: /api/department-head/counsellors/:id
// method: PUT
// description: Cập nhật (thêm) lĩnh vực cho tư vấn viên
export const updateFieldToCounsellor = catchAsyncErrors(
  async (req, res, next) => {
    const { fieldIds } = req.body;

    if (!fieldIds || fieldIds.length === 0) {
      return next(
        new ErrorHandler(
          422,
          'Vui lòng nhập lĩnh vực thêm cho tư vấn viên',
          4064
        )
      );
    }

    const department = req.foundDepartment;
    const fields = await Field.find({ _id: { $in: fieldIds }, department });

    // active fields
    const activeFields = fields.filter((field) => field.isActive);

    // inactive fields
    const inactiveFields = fields.filter((field) => !field.isActive);

    // active field ids
    const activeFieldIds = activeFields.map((field) => field._id);

    // inactive field ids
    const inactiveFieldIds = inactiveFields.map((field) => field._id);

    const strFieldIds = fields.map((field) => field._id.toString());

    // field is not in current department
    const fieldIdsNotInDepartment = fieldIds.filter(
      (fieldId) => !strFieldIds.includes(fieldId)
    );

    const updateCounsellor = req.foundCounsellor;

    // lọc những fieldIds chưa được thêm vào counsellor để tiến hành thêm vào counsellor (tránh trùng lập)
    const newFieldIds = activeFieldIds.filter(
      (fieldId) => !updateCounsellor.counsellor.fields.includes(fieldId)
    );

    updateCounsellor.counsellor.fields.push(...newFieldIds);
    await updateCounsellor.save();

    res.json({
      success: true,
      message: 'Thêm lĩnh vực cho tư vấn viên thành công',
      failedFieldIds: [...inactiveFieldIds, ...fieldIdsNotInDepartment],
    });
  }
);

// endpoint: /api/department-head/counsellors
// method: GET
// description: Lấy danh tư vấn viên dùng trong khoa (phân trang, tìm kiếm, lọc)
export const counsellorsHandler = catchAsyncErrors(async (req, res, next) => {
  const department = req.foundDepartment;
  const queryAPI = new QueryAPI(
    User.find({
      role: { $ne: 'DEPARTMENT_HEAD' },
      'counsellor.department': department,
    })
      .lean()
      .populate({
        path: 'counsellor.fields',
        select: 'fieldName',
      })
      // .select(
      //   '_id fullName avatar email phoneNumber counsellor.fields isEnabled'
      // ),

      // for test show role
      .select(
        'fullName role avatar email phoneNumber counsellor.fields isEnabled'
      ),
    req.query
  )
    .search()
    .filter()
    .sort();

  let counsellorRecords = await queryAPI.query;
  const numberOfCounsellors = counsellorRecords.length;
  counsellorRecords = await queryAPI.pagination().query.clone();

  const {
    data: retCounsellors,
    page,
    pages,
  } = paginateResults(
    numberOfCounsellors,
    req.query.page,
    req.query.size,
    counsellorRecords
  );

  const counsellors = retCounsellors.map((user) => {
    user.avatar = user.avatar.url;
    user.fields = user.counsellor.fields;
    delete user.counsellor;
    return user;
  });

  res.json({ success: true, counsellors, page, pages, code: 2041 });
});

// endpoint: /api/department-head/fields
// method: GET
// description: Lấy danh sách lĩnh vực của khoa (phân trang, tìm kiếm, lọc)
export const fieldsHandler = catchAsyncErrors(async (req, res, next) => {
  const queryAPI = new QueryAPI(Field.find().lean().select('-__v'), req.query)
    .search()
    .filter()
    .sort();

  // get all fields in DB
  let fieldsRecords = await queryAPI.query;
  // number of record in db
  const numberOfFields = fieldsRecords.length;
  // get department in page with size
  fieldsRecords = await queryAPI.pagination().query.clone();

  const {
    data: fields,
    page,
    pages,
  } = paginateResults(
    numberOfFields,
    req.query.page,
    req.query.size,
    fieldsRecords
  );
  res.json({ success: true, fields, page, pages, code: 2040 });
});

// endpoint: /api/department-head/fields/:id
// method: PATCH
// description: Cập nhật trạng lĩnh vực của khoa
export const updateStatusFieldHandler = catchAsyncErrors(
  async (req, res, next) => {
    const field = req.foundField;
    const { isActive } = req.body;
    field.isActive = isActive;

    const savedField = await field.save();

    const newStrStatus = savedField.isActive ? 'Mở khóa' : 'Khóa';

    res.json({
      success: true,
      message: `${newStrStatus} lĩnh vực thành công`,
      code: 2073,
    });
  }
);

// endpoint: /api/department-head/fields
// method: POST
// description: Cập nhật lĩnh vực của khoa
export const updateFieldHandler = catchAsyncErrors(async (req, res, next) => {
  const field = req.foundField;
  const { fieldName } = req.body;
  field.fieldName = fieldName;
  // save
  await field.save();
  // res
  res.json({
    success: true,
    message: 'Cập nhật tên lĩnh vực thành công',
    code: 2028,
  });
});

// endpoint: /api/department-head/fields
// method: POST
// description: Thêm lĩnh vực vào khoa
export const addFieldHandler = catchAsyncErrors(async (req, res, next) => {
  const { fieldName } = req.body;
  const department = req.foundDepartment;
  await Field.create({ fieldName, department });

  res.status(201).json({
    success: true,
    message: 'Thêm lĩnh vực thành công',
    code: 2018,
  });
});
