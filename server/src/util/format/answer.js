import { formatUserForAnswer } from './user.js';

export function formatAnswer(answer) {
  return {
    content: answer.content,
    fileURL: answer.file.url,
    user: formatUserForAnswer(answer.user),
    answeredAt: answer.answeredAt,
  };
}
