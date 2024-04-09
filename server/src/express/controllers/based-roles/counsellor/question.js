import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';
import Question from '../../../../models/question.js';
import ForwardedQuestion from '../../../../models/forwarded-question.js';
import queryFiltersLimit from '../../../../util/db/query-filters-limit.js';
import QueryAPI from '../../../../util/db/query-api.js';
import paginate from '../../../../util/db/paginate.js';
import { DEPARTMENT_HEAD_OR_COUNSELLOR_GET_ALL_QUESTIONS } from '../../../../constants/actions/question.js';

// Endpoint: /api/counsellor/questions
// Method: GET
// Description: Lấy danh sách các câu hỏi chưa được trả lời
export const handleGetQuestions = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  const { department, fields } = user.counsellor;

  const query = Question.find()
    .populate({ path: 'user', select: '-_id fullName avatar.url' })
    .populate({ path: 'field', select: '-_id fieldName' })
    .select('title content file createdAt views user field');
  // không sử dụng learn vì method trong được tạo schema
  // .lean()

  const filterStatus = { status: 'unanswered' };
  const filterDepartment = { department: department._id };

  // console.log(fields);

  // const filterField = {};

  // if (user.role !== 'DEPARTMENT_HEAD') {
  //   filterField['field'] = { $in: fields };
  // }

  const requestQuery = queryFiltersLimit(
    req.query,
    filterStatus,
    filterDepartment,
    user.role === 'COUNSELLOR' && { field: { $in: fields } }
  );

  const queryAPI = new QueryAPI(query, requestQuery).search().filter().sort();
  let questionRecords = await queryAPI.query;
  // console.log(questionRecords.length);
  const numberOfQuestions = questionRecords.length;
  questionRecords = await queryAPI.pagination().query.clone();

  const {
    data: retQuestions,
    page,
    pages,
  } = paginate(
    numberOfQuestions,
    req.query.page,
    req.query.size,
    questionRecords
  );

  const questions = retQuestions.map((question) =>
    question.getQuestionInformation(
      DEPARTMENT_HEAD_OR_COUNSELLOR_GET_ALL_QUESTIONS
    )
  );

  res.json({
    success: true,
    questions,
    page,
    pages,
    code: 2062,
  });
});

// Endpoint: /api/counsellor/questions/:id
// Method: PUT
// Description: Trưởng khoa/tư vấn viên chuyển tiếp câu hỏi
export const handleForwardQuestion = catchAsyncErrors(
  async (req, res, next) => {
    const question = req.foundQuestion;

    const newDepartment = req.foundDepartment;

    const newField = req.foundField;

    const fromDepartment = question.department;

    const forwardedQuestion = await ForwardedQuestion.findOne({ question });

    if (forwardedQuestion) {
      forwardedQuestion.fromDepartment = fromDepartment;
      forwardedQuestion.toDepartment = newDepartment;
      forwardedQuestion.field = newField;
      forwardedQuestion.forwardedAt = Date.now();
      await forwardedQuestion.save();
    } else {
      await ForwardedQuestion.create({
        question,
        fromDepartment,
        toDepartment: newDepartment,
        field: newField,
      });
      question.isForwarded = true;
    }

    question.department = newDepartment;
    await question.save();

    res.status(201).json({
      success: true,
      message: 'Chuyển tiếp câu hỏi thành công',
      code: 2069,
    });
  }
);

// Endpoint: /api/counsellor/questions/unanswered-question
// Method: GET
// Description: Tư vấn viên kiểm tra có câu hỏi cần trả lời hay không
export const handleCheckUnansweredQuestionExists = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.user;
    const { department, fields } = user.counsellor;

    // console.log(department);
    // console.log(fields);

    const numberOfQuestions = await Question.countDocuments({
      department,
      status: 'unanswered',
      field: { $in: fields },
    });

    res.json({
      success: true,
      unansweredQuestion: numberOfQuestions > 0,
      code: 2071,
    });
  }
);
