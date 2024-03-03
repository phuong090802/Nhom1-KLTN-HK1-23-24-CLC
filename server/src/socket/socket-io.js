import validator from 'validator';
import path from 'path';
import { nanoid } from 'nanoid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import storage from '../configs/firebase-init.js';

import {
  validateDepartmentNameForCreate,
  validateDepartmentNameForUpdate,
} from './controllers/admin.js';
import {
  validateEmail,
  validateEmailForForgotPassword,
  validateEmailForRegister,
  validatePhoneNumberForRegister,
  verifyEmail,
  verifyOTP,
} from './controllers/auth.js';
import {
  validateFieldNameCreate,
  validateFieldNameUpdate,
} from './controllers/department-head.js';
import {
  authorizeRolesHandler,
  isAuthenticatedHandler,
} from './middlewares/auth.js';
import Question from '../models/question.js';
import Answer from '../models/answer.js';
import { mimetype } from '../constants/file.js';
import { isSupportFileSize, isSupportedMimetype } from '../utils/validation.js';
import { statusQuestionMapper } from '../utils/field-mapper.js';
import QueryAPI from '../utils/query-api.js';
import paginateResults from '../utils/pagination.js';
import { defaultPayloadForPaginationQuestions } from '../constants/socket-payload.js';

export default function socketIO(io) {
  io.of('/').on('connection', (socket) => {
    socket.on('register:validate-email', validateEmailForRegister);
    socket.on('register:validate-phone-number', validatePhoneNumberForRegister);
    socket.on('forgot-password:validate-email', validateEmailForForgotPassword);
    socket.on('verify-otp', verifyOTP);
  });

  io.of('/auth')
    .use(isAuthenticatedHandler)
    .on('connection', (socket) => {
      socket.on('validate-email', (payload, callback) =>
        validateEmail(socket, payload, callback)
      );

      socket.on('verify-email', (payload, callback) => {
        verifyEmail(socket, payload, callback);
      });
    });

  io.of('/admin')
    .use(isAuthenticatedHandler)
    .use(authorizeRolesHandler('ADMIN'))
    .on('connection', (socket) => {
      socket.on(
        'department:validate-department-name:create',
        validateDepartmentNameForCreate
      );
      socket.on(
        'department:validate-department-name:update',
        validateDepartmentNameForUpdate
      );
    });

  io.of('department-head')
    .use(isAuthenticatedHandler)
    .use(authorizeRolesHandler('DEPARTMENT_HEAD'))
    .on('connection', (socket) => {
      socket.on('fields:validate-field-name:create', (payload, callback) =>
        validateFieldNameCreate(socket, payload, callback)
      );

      socket.on('field:validate-field-name:update', (payload, callback) =>
        validateFieldNameUpdate(socket, payload, callback)
      );

      socket.on('answer:approve', async (payload, callback) => {
        const { questionId, isApproved } = payload;

        if (!validator.isMongoId(questionId)) {
          return callback({
            success: false,
            message: 'Mã câu hỏi không hợp lệ',
            code: 4057,
          });
        }

        const question = await Question.findById(questionId);

        if (question.status !== 'publicly-answered-pending-approval') {
          return callback({
            success: false,
            message: 'Câu hỏi chưa được trả lời',
            code: 4058,
          });
        }

        if (isApproved) {
          question.status = 'publicly-answered-and-approved';
        } else {
          question.status = 'unanswered';
          question.answer = null;
        }
        const savedQuestion = await question.save();

        const newStrStatus = statusQuestionMapper[savedQuestion.status];

        callback({
          success: true,
          message: newStrStatus + ' thành công',
          code: 2032,
        });

        io.of('/questions').emit(
          'get-all-questions',
          defaultPayloadForPaginationQuestions
        );
      });
    });

  io.of('/counsellor')
    .use(isAuthenticatedHandler)
    .use(authorizeRolesHandler('COUNSELLOR', 'DEPARTMENT_HEAD'))
    .on('connection', (socket) => {
      socket.on('answer:create', async (payload, callback) => {
        const user = socket.user;
        const { questionId, content, file } = payload;

        if (!validator.isMongoId(questionId)) {
          return callback({
            success: false,
            message: 'Mã câu hỏi không hợp lệ',
            code: 4053,
          });
        }

        const question = await Question.findById(questionId);

        if (question.status !== 'unanswered') {
          return callback({
            success: false,
            message: 'Câu hỏi đã được trả lời',
            code: 4056,
          });
        }

        let answerData = {
          content,
          user,
          question,
        };
        if (file.buffer) {
          if (
            isSupportedMimetype(
              [...mimetype.image, ...mimetype.document],
              file.mimetype
            )
          ) {
            return callback({
              success: false,
              message: 'Định dạng file không được hỗ trợ',
              code: 4052,
            });
          }

          // 2MB
          const limits = 2;
          if (!isSupportFileSize(limits * 1024 * 1024, file)) {
            return callback({
              success: false,
              message: `Chỉ hổ trợ file trong khoảng ${limits} MB`,
              code: 4051,
            });
          }
          const extension = path.extname(file.originalname);
          const filename = nanoid() + extension;
          const fileRef = `answers/${filename}`;
          const storageRef = ref(storage, fileRef);
          await uploadBytes(storageRef, new Uint8Array(file.buffer));
          const url = await getDownloadURL(storageRef);
          answerData = {
            ...answerData,
            file: {
              ref: fileRef,
              url,
            },
          };
        }

        const answer = await Answer.create(answerData);

        let status = 'publicly-answered-pending-approval';
        // for private message
        // io.of('/messages')
        // do stuff

        if (user.role === 'DEPARTMENT_HEAD') {
          status = 'publicly-answered-and-approved';
        }

        question.answer = answer;
        question.status = status;

        await question.save();

        // emit list unanswered for diff counsellors
        // do stuff
        // io.of('/counsellor').emit('questions:read')

        callback({
          success: true,
          message: 'Trả lời câu hỏi thành công',
          code: 2031,
        });
      });
    });

  io.of('/questions').on('connection', (socket) => {
    socket.on('get-all-questions', async (payload) => {
      payload.page = payload.page || 1;
      payload.size = payload.size || 5;
      const query = Question.find({
        status: 'publicly-answered-and-approved',
      })
        .lean()
        .populate({
          path: 'answer',
          select: '_id content user',
          populate: {
            path: 'user',
            select: '_id fullName avatar',
          },
        })
        .populate({
          path: 'user',
          select: '_id fullName avatar',
        })
        .select('_id title content createdAt views user answer');

      const queryAPI = new QueryAPI(query, payload).search().filter().sort();

      let questionRecords = await queryAPI.query;
      const numberOfQuestions = questionRecords.length;
      questionRecords = await queryAPI.pagination().query.clone();

      const {
        data: questions,
        page,
        pages,
      } = paginateResults(
        numberOfQuestions,
        payload.page,
        payload.size,
        questionRecords
      );
      const response = { success: true, questions, page, pages, code: 2033 };
      socket.emit('question:list', response);
    });
  });
}
