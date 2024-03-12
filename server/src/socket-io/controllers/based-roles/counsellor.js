import Feedback from '../../../models/feedback.js';
import QueryAPI from '../../../utils/query-api.js';

// namespace: /counsellor
// listen event (ack): feedback:list
// description: Tư vấn viên load danh sách feedback của họ (không phân trang)
export async function getAllFeedbacks(socket, payload) {
  const user = socket.user;
  const query = Feedback.find({ 'answer.user': user })
    .sort({ createdAt: -1 })
    .lean()
    .populate({
      path: 'question',
      select: '-_id title content',
    })
    .select('_id content createdAt answer.content answer.answeredAt question');

  const queryAPI = new QueryAPI(query, payload).search().filter().sort();

  let feedbacks = await queryAPI.query;

  const response = { success: true, feedbacks, code: 2045 };

  socket.emit('feedback:list', response);
}
