import FAQ from '../../../../models/faq.js';
import Field from '../../../../models/field.js';
import Question from '../../../../models/question.js';
import User from '../../../../models/user.js';
import { handleCountQuestions } from '../../../../util/statistics/department.js';
import { handleCountQuestionsByFieldsAndDepartment } from '../../../../util/statistics/field.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/statistics/department-head/question
// Method: GET
// Description: Trưởng khoa đếm số câu hỏi mà khoa đã nhận
export const handleCountOfQuestions = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;
    const countOfQuestions = await Question.countDocuments({ department });
    res.json({
      success: true,
      countOfQuestions,
      code: 2109,
    });
  }
);

// Endpoint: /api/department-head/statistics/counsellor/ranking
// Method: GET
// Description: Trưởng khoa xếp hạng tư vấn viên (theo số lượng câu hỏi đã trả lời) thành công
export const handleCounsellorRanking = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.user;
    const department = user.counsellor.department._id;
    const counsellors = await User.find({
      'counsellor.department': department,
    }).select('avatar.url fullName');

    const returnedCounsellors = await Promise.all(
      counsellors.map(async (counsellor) => {
        const countOfAnsweredQuestions = await Question.countDocuments({
          'answer.user': counsellor._id,
          $or: [
            { status: 'publicly-answered-and-approved', answer: { $ne: null } },
            { status: 'privately-answered' },
          ],
        });

        counsellor.avatar = counsellor.avatar.url;
        delete counsellor.avatar.url;

        return {
          counsellor,
          countOfAnsweredQuestions,
        };
      })
    );

    const rankingCounsellor = returnedCounsellors.sort((a, b) => {
      if (b.countOfAnsweredQuestions !== a.countOfAnsweredQuestions) {
        return b.countOfAnsweredQuestions - a.countOfAnsweredQuestions; // Sort by countOfAnsweredQuestions descending
      } else {
        return a.counsellor.fullName.localeCompare(b.counsellor.fullName); // Sort by fullName ascending
      }
    });

    res.json({
      success: true,
      rankingCounsellor,
      code: 2108,
    });
  }
);

// Endpoint: /api/department-head/statistics/field/ranking
// Method: GET
// Description: Trưởng khoa xếp hạng lĩnh vực (theo số lượng câu hỏi)
export const handleFieldRanking = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  const department = user.counsellor.department._id;
  const fields = await Field.find({ department, isActive: true }).select(
    '_id fieldName'
  );
  const returnedFields = await handleCountQuestionsByFieldsAndDepartment(
    fields
  );
  const rankingCounsellor = returnedFields.sort((a, b) => {
    if (b.countOfQuestions !== a.countOfQuestions) {
      return b.countOfQuestions - a.countOfQuestions; // Sort by countOfQuestions descending
    } else {
      return a.field.fieldName.localeCompare(b.field.fieldName); // Sort by fieldName ascending
    }
  });

  res.json({
    success: true,
    rankingCounsellor,
    code: 2106,
  });
});

// Endpoint: /api/department-head/statistics/field/count
// Method: GET
// Description: Trưởng khoa đếm số lượng lĩnh vực trong khoa của họ
export const handleCountOfFields = catchAsyncErrors(async (req, res, next) => {
  const department = req.foundDepartment;
  const countOfFields = await Field.countDocuments({ department });
  res.json({
    success: true,
    countOfFields,
    code: 2102,
  });
});

// Endpoint: /api/department-head/statistics/field
// Method: GET
// Description: Trưởng khoa thống kê lĩnh vực và số câu hỏi thuộc lĩnh vực trong khoa
export const handleStatisticFields = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;
    const fields = await Field.find({ department }).select('_id fieldName');
    const fieldStatistic = await handleCountQuestionsByFieldsAndDepartment(
      fields
    );
    res.json({
      success: true,
      fieldStatistic,
      code: 2091,
    });
  }
);

// Endpoint: /api/department-head/statistics/department/question
// Method: POST
// Description: Department head thống kê số câu hỏi của trưởng khoa (trả lời công khai và đã được duyệt, trả lời riêng tư)
export const handleStatisticQuestions = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;
    // validate
    const { timeUnit, latestTime } = req.body;
    const departmentStatistic = await handleCountQuestions(
      timeUnit,
      latestTime,
      department
    );
    res.json({
      success: true,
      departmentStatistic,
      code: 2089,
    });
  }
);

// Endpoint: /api/statistics/department-head/counsellor
// Method: GET
// Description: Trưởng khoa đếm số tư vấn viên của khoa
export const handleCountOfCounsellors = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;
    const countOfUsers = await User.countDocuments({
      'counsellor.department': department,
    });
    res.json({
      success: true,
      countOfUsers,
      code: 2085,
    });
  }
);

// Endpoint: /api/statistics/department-head/faq
// Method: GET
// Description: Trưởng khoa đếm số câu hỏi chung trong khoa
export const handleCountOfFAQs = catchAsyncErrors(async (req, res, next) => {
  const department = req.foundDepartment;
  const countOfFAQs = await FAQ.countDocuments({ department });
  res.json({
    success: true,
    countOfFAQs,
    code: 2086,
  });
});
