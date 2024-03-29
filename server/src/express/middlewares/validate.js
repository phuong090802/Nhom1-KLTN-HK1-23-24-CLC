import catchAsyncErrors from './catch-async-errors.js';

import Department from '../../models/department.js';
import Field from '../../models/field.js';
import User from '../../models/user.js';

import Conversation from '../../models/conversation.js';
import Feedback from '../../models/feedback.js';
import Question from '../../models/question.js';

import ErrorHandler from '../../util/error/http-error-handler.js';

import questionStatus from '../../constants/mapper/question-status.js';
import FAQ from '../../models/faq.js';

// validate value id of department in body
export const validateDepartmentIdInBody = catchAsyncErrors(
  async (req, res, next) => {
    const { departmentId } = req.body;
    const department = await Department.findById(departmentId);
    if (!department) {
      return next(new ErrorHandler(404, 'Không tìm thấy khoa', 4033));
    }
    req.foundDepartment = department;
    next();
  }
);

// validate value id of department in path params
export const validateDepartmentIdInParams = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const department = await Department.findById(id);
    if (!department) {
      return next(new ErrorHandler(404, 'Không tìm thấy khoa', 4034));
    }
    req.foundDepartment = department;
    next();
  }
);

// check role of user by user id in body
export const validateUserIdInBodyWithRole = (role) => {
  return catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId, role });
    if (!user) {
      return next(
        new ErrorHandler(
          404,
          `Không tìm thấy tài khoản với vai trò ${role}`,
          4032
        )
      );
    }
    req.foundUser = user;
    next();
  });
};

// admin chỉ thêm tài khoản cho COUNSELLOR và SUPERVISOR
export const validateRoleInBody = (...roles) => {
  return catchAsyncErrors((req, res, next) => {
    const role = req.body.role;
    if (!roles.includes(role)) {
      return next(new ErrorHandler(400, `${role} không được hổ trợ`, 4029));
    }
    next();
  });
};

// kiểm tra id người dùng có tồn tại trong DB không
export const validateUserIdInParams = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return next(new ErrorHandler(404, 'Không tìm thấy tài khoản', 4037));
    }
    req.foundUser = user;
    next();
  }
);

// Kiểm tra mã khoa của tư vấn viên, trưởng khoa trước khi truy cập vào các route
export const validateDepartmentOfCounsellor = catchAsyncErrors(
  async (req, res, next) => {
    const department = await Department.findById(
      req.user.counsellor.department
    );
    if (!department) {
      return next(new ErrorHandler(404, 'Không tìm thấy khoa', 4038));
    }
    req.foundDepartment = department;
    next();
  }
);

// Kiểm tra trạng thái khoa của tư vấn viên, trưởng khoa trước khi truy cập vào các route
export const validateStatusDepartmentOfCounsellor = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;
    if (!department.isActive) {
      return next(
        new ErrorHandler(400, 'Không thể truy cập. Khoa đang bị khóa', 4075)
      );
    }
    next();
  }
);

// trưởng khoa kiểm tra lĩnh vực của thuộc khoa mình trước khi thực hiện các thao tác liên quan
export const validateFieldIdInParams = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const department = req.foundDepartment;
    const field = await Field.findOne({ _id: id, department });
    if (!field) {
      return next(new ErrorHandler(404, 'Không tìm lĩnh vực thuộc khoa', 4047));
    }
    req.foundField = field;
    next();
  }
);

// Kiểm tra trạng thái của lĩnh vực trước khi trưởng khoa cập nhật lĩnh vực (tên)
export const departmentHeadValidateStatusOfField = catchAsyncErrors(
  async (req, res, next) => {
    const field = req.foundField;
    if (!field.isActive) {
      return next(
        new ErrorHandler(
          400,
          'Lĩnh vực đang bị khóa. Vui lòng mở khóa trước khi thực hiện các thao tác liên quan',
          4078
        )
      );
    }
    next();
  }
);

// Kiểm tra lĩnh vực có trong DB không (tìm bằng id và khoa)
export const validateFieldIdInBodyOfBelongToDepartment = catchAsyncErrors(
  async (req, res, next) => {
    const { fieldId } = req.body;
    const department = req.foundDepartment;
    const field = await Field.findOne({ _id: fieldId, department });
    if (!field) {
      return next(new ErrorHandler(404, 'Không tìm lĩnh vực thuộc khoa', 4049));
    }
    req.foundField = field;
    next();
  }
);

// admin kiểm tra trạng thái của khoa trước khi cập nhật (tên, thêm tư vấn viên vào khoa)
export const adminValidateStatusOfDepartment = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;
    if (!department.isActive) {
      return next(
        new ErrorHandler(
          400,
          'Khoa đang bị khóa. Vui lòng mở khóa trước khi thực hiện các thao tác liên quan',
          4073
        )
      );
    }
    next();
  }
);

// chưa sử dụng
// người dùng kiểm tra trạng thái khoa trước khi đặt câu hỏi
export const userValidateStatusOfDepartment = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;
    if (!department.isActive) {
      return next(
        new ErrorHandler(400, 'Khoa đang bị khóa. Không thể đặt câu hỏi', 4076)
      );
    }
    next();
  }
);

// chưa sử dụng
// người dùng kiểm tra trạng thái lĩnh vực trước khi đặt câu hỏi
export const userValidateStatusOfField = catchAsyncErrors(
  async (req, res, next) => {
    const field = req.foundField;
    if (!field.isActive) {
      return next(
        new ErrorHandler(
          400,
          'Lĩnh vực đang bị khóa. Không thể đặt câu hỏi',
          4077
        )
      );
    }
    next();
  }
);

// kiểm tra trạng thái của khoa trước khi lấy lĩnh vực
export const validateStatusOfDepartment = catchAsyncErrors(
  async (req, res, next) => {
    const department = req.foundDepartment;
    if (!department.isActive) {
      return next(
        new ErrorHandler(400, 'Khoa đang bị khóa. Không lấy lĩnh vực', 4079)
      );
    }
    next();
  }
);

// kiểm tra id tư vấn viên có tồn tại trong DB không
export const validateCounsellorIdInParams = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const counsellor = await User.findOne({ _id: id, role: 'COUNSELLOR' });
    if (!counsellor) {
      return next(new ErrorHandler(404, 'Không tìm thấy tư vấn viên', 4063));
    }
    req.foundCounsellor = counsellor;
    next();
  }
);

// những role bị chặn (trong param)
// tránh tình trạng admin upload trạng thái của bản thân
// tránh tình trạng department upload trạng thái của bản thân hoặc department khác
export const permissionsCannotBeModified = (roles) => {
  return catchAsyncErrors(async (req, res, next) => {
    const user = req.foundUser;

    if (roles.includes(user.role)) {
      return next(
        new ErrorHandler(404, 'Permission error. Thao tác không hợp lệ', 4069)
      );
    }
    req.foundUser = user;
    next();
  });
};

// Kiểm tra feedback id được truyền vào có phải của tư vấn viên không
export const validateFeedbackOfCounsellor = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.user;
    const { id } = req.params;
    const feedback = await Feedback.findOne({ _id: id, 'answer.user': user });
    if (!feedback) {
      return next(new ErrorHandler(404, 'Không tìm thấy phản hồi', 4070));
    }
    req.foundFeedback = feedback;
    next();
  }
);

export const validateFileInFormData = catchAsyncErrors(
  async (req, res, next) => {
    if (!req.file) {
      return next(new ErrorHandler(400, 'Không tìm thấy file', 4083));
    }
    next();
  }
);

// kiểm tra id câu hỏi có tồn tại có tồn tại trong DB không
export const validateQuestionIdInParams = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const question = await Question.findById(id);
    if (!question) {
      return next(new ErrorHandler(404, 'Không tìm thấy câu hỏi', 4084));
    }
    req.foundQuestion = question;
    next();
  }
);

export const validateStatusOfQuestion = (status) => {
  return catchAsyncErrors(async (req, res, next) => {
    const question = req.foundQuestion;
    if (question.status !== status) {
      return next(
        new ErrorHandler(
          404,
          `Không tìm thấy câu hỏi ở trạng thái: '${questionStatus[status]}'`,
          4085
        )
      );
    }
    next();
  });
};

// validate value id of conversation in body
export const validateConversationIdInParams = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;

    const conversation = await Conversation.findById(id);

    if (!conversation) {
      return next(new ErrorHandler(404, 'Không tìm cuộc đối thoại', 4051));
    }
    req.foundConversation = conversation;
    next();
  }
);

// validate user is not in participates
export const userIsInParticipatesConversation = catchAsyncErrors(
  async (req, res, next) => {
    const conversation = req.foundConversation;
    const user = req.user;

    const participates = conversation.participates;

    if (!participates.includes(user._id)) {
      throw new ErrorHandler('Không tìm thấy cuộc trò chuyện', 4054);
    }

    next();
  }
);

// validate user is not in deletedBy
export const userIsNotInDeleteConversation = catchAsyncErrors(
  async (req, res, next) => {
    const conversation = req.foundConversation;
    const user = req.user;
    const deletedBy = conversation.deletedBy;

    if (deletedBy.includes(user._id)) {
      throw new ErrorHandler('Không tìm thấy cuộc trò chuyện', 4055);
    }
    next();
  }
);

// Kiểm tra câu hỏi có thuộc về khoa hay không trước khi chuyển tiếp
export const validateQuestionBelongToDepartment = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.user;
    const question = req.foundQuestion;
    if (!question.department.equals(user.counsellor.department)) {
      return next(
        new ErrorHandler(
          404,
          'Không tìm thấy câu hỏi thuộc về khoa để chuyển tiếp',
          4098
        )
      );
    }
    next();
  }
);

// Kiểm tra khoa có khác nhau trước khia chuyển tiếp
export const validateDepartmentIdBeforeForwarding = catchAsyncErrors(
  async (req, res, next) => {
    const newDepartment = req.foundDepartment;
    const question = req.foundQuestion;
    if (question._id.equals(newDepartment._id)) {
      return next(
        new ErrorHandler(400, 'Không thể chuyển tiếp câu hỏi cùng khoa', 4099)
      );
    }
    next();
  }
);

// Kiểm tra khoa có khác nhau trước khia chuyển tiếp
export const validateCounsellorIncludesFieldOfQuestion = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.user;

    if (user.role === 'DEPARTMENT_HEAD') {
      return next();
    }

    const { fields } = user.counsellor;
    const question = req.foundQuestion;
    if (!fields.includes(question.field)) {
      return next(
        new ErrorHandler(
          400,
          'Không thể chuyển tiếp. Câu hỏi không thuộc lĩnh vực được hỗ trợ',
          4100
        )
      );
    }
    next();
  }
);

// Kiểm tra faq có tồn tại trong db không bằng id được truyền vào
export const validateFAQIdInParams = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const faq = await FAQ.findById(id);
    if (!faq) {
      return next(new ErrorHandler(404, 'Không tìm thấy câu hỏi chung', 4101));
    }
    req.foundFAQ = faq;
    next();
  }
);

export const validateFAQBelongDepartment = catchAsyncErrors(
  async (req, res, next) => {
    const faq = req.foundFAQ;
    const user = req.user;

    const { department: departmentOfUser } = user.counsellor;
    const departmentOfFAQ = faq.department;

    // console.log('departmentOfUser', departmentOfUser);
    // console.log('departmentOfFAQ', departmentOfFAQ);

    if (!departmentOfUser.equals(departmentOfFAQ)) {
      return next(
        new ErrorHandler(400, 'Câu hỏi chung không thuộc về khoa', 4102)
      );
    }
    next();
  }
);
