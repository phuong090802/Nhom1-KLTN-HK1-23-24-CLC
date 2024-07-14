import isEmail from 'validator/lib/isemail';
import isMobilePhone from 'validator/lib/isMobilePhone';

const createFormInitData = (array) => {
  const initData = {};
  array.forEach((item) => {
    initData[item.name] = '';
  });
  return initData;
};

const ruleValidators = {
  isRequired: (value) => {
    return !value ? 'Trường này không được để trống' : '';
  },
  isEmail: (value) => {
    return isEmail(value) ? '' : 'Email không hợp lệ';
  },
  isMobilePhone: (value) => {
    return isMobilePhone(value) ? '' : 'Số điện thoại không hợp lệ';
  },
  minLength: (value, length) => {
    return value.length >= length ? '' : `Yêu cầu tối thiểu ${length} ký tự `;
  },
  isConfirm: (value, confirmValue) => {
    console.log(value, confirmValue);
    return value === confirmValue ? '' : 'Xác nhận không đúng';
  },
};

const ruleList = {
  isRequired: () => {
    return { name: 'isRequired' };
  },
  isMobilePhone: () => {
    return { name: 'isMobilePhone' };
  },
  isEmail: () => {
    return { name: 'isEmail' };
  },
  minLength: (length) => {
    return { name: 'minLength', value: length };
  },
  isConfirm: (value) => {
    return { name: 'isConfirm', value: value };
  },
};

export { createFormInitData, ruleList, ruleValidators };

