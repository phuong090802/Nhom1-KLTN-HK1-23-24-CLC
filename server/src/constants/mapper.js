// giá trị unique
// sau này làm thì cần đặt khác tên để map tùy biến cho dễ
export const fieldMapper = {
  email: 'Email',
  phoneNumber: 'Số điện thoại',
  departmentName: 'Tên khoa',

  // Pitfall trong OneNote
  department: 'Khoa',
  field: 'Lĩnh vực',
  question: 'Câu hỏi'
};

export const statusQuestionApprovedMapper = {
  unanswered: 'Từ chối duyệt câu trả lời',
  'publicly-answered-and-approved': 'Duyệt câu trả lời',
};

export const questionStatus = {
  unanswered: 'Chưa được trả lời',
  'publicly-answered-pending-approval': 'Đã trả lời công khai và chờ duyệt',
  'publicly-answered-and-approved': 'Trả lời công khai và đã được duyệt',
  'privately-answered': 'trả lời riêng tư',
};
