import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import validator from 'validator';
import path from 'path';
import { nanoid } from 'nanoid';

import storage from '../../../configs/firebase-init.js';
import Question from '../../../models/question.js';
import { mimetype } from '../../../constants/file.js';
import {
  isSupportFileSize,
  isSupportedMimetype,
} from '../../../utils/validation.js';

// namespace: /counsellor
// listen event (ack): answer:create
// description: Tư vấn viên, trưởng khoa trả lời câu hỏi
export async function createAnswer(io, socket, payload, callback) {
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
      message: 'Câu hỏi không ở tình trạng chưa trả lời',
      code: 4056,
    });
  }

  let answerData = {
    content,
    user,
  };
  if (file && file.buffer) {
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

  // const answer = await Answer.create(answerData);

  let status = 'publicly-answered-pending-approval';
  // for private message
  // io.of('/messages')
  // do stuff

  if (user.role === 'DEPARTMENT_HEAD') {
    status = 'publicly-answered-and-approved';
  }

  question.answer = answerData;
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
}
