import { formatUser } from './user.js';

export function formatAnswer(answer) {
  return {
    content: answer.content,
    fileURL: answer.file.url,
    user: formatUser(answer.user),
    answeredAt: answer.answeredAt,
  };
}
