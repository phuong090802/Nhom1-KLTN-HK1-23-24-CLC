import { ruleList as rule } from '../../../molecule/my-form';

const formInitData = {
  id: 'login-form',
  inputs: [
    {
      label: 'Nhập số điện thoại',
      name: 'username',
      type: 'tel',
      rules: [rule.isRequired(), rule.isMobilePhone()],
    },
    {
      label: 'Mật khẩu',
      name: 'password',
      type: 'password',
      rules: [rule.isRequired(), rule.minLength(6)],
    },
  ],
};

export { formInitData };

