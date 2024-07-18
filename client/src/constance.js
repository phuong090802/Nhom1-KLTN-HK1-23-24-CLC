const colors = {
  primary: '#2785DC',
  secondary: '#1DDBD2',
  // success: "#00FF00",
  success: '#4BB543',
  error: '#ED1B24',
  warning: '#FFB818',
  light_gray: '#d3d3d3',
  black100: 'rgba(36, 41, 45, 1)',
  black75: 'rgba(36, 41, 45, 0.75)',
  black50: 'rgba(36, 41, 45, 0.5)',
  black25: 'rgba(36, 41, 45, 0.25)',
  black10: 'rgba(36, 41, 45, 0.1)',
};

const links = {
  public: {
    home: '/',
    faqs: '/thu-vien-cau-hoi',
    counsellors: '/danh-sach-tu-van-vien',
    news: '/tin-tuc',
    register: '/dang-ky',
    login: '/dang-nhap',
    feedback: '/phan-hoi',
    forgotPassword: '/quen-mat-khau',
  },

  user: {
    profile: '/thong-tin-nguoi-dung',
    passwordChange: '/doi-mat-khau',
    verify: '/xac-thuc',
    history: '/lich-su-tu-van',
  },
  counsellor: {
    home: '/counsellor',
    questions: '/counsellor/cau-hoi',
    feedback: '/counsellor/phan-hoi',
  },
  dephead: {
    home: '/dephead',
    questions: '/dephead/cau-hoi',
    fields: '/dephead/linh-vuc',
    staffs: '/dephead/nhan-su',
    faqs: '/dephead/faqs',
    answers: '/dephead/duyet-cau-tra-loi',
  },
  admin: {
    home: '/admin',
    department: '/admin/khoa',
    staffs: '/admin/nhan-su',
    news: '/admin/tin-tuc',
    fields: '/admin/linh-vuc-chung'
  },
  supervisor: { home: '/supervisor' },
};

const validate = {
  required: (value, alertMessageName) => {
    return !value
      ? `${alertMessageName || 'Trường này'} không thể để trống`
      : '';
  },
  minLength: (value, minLength, alertMessageName) => {
    return value?.length < minLength
      ? `${
          alertMessageName || 'Trường này'
        } không thể có ít hơn ${minLength} ký tự`
      : '';
  },
  confirm: (value, confirmValue, alertMessageName) => {
    return value != confirmValue
      ? `Xác nhận ${alertMessageName || ''} không đúng`
      : '';
  },
};

const darkModeCss = 'bg-[#3d3d3d] text-white duration-500';

export { colors, darkModeCss, links, validate };

