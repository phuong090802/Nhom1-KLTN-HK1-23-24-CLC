import validator from 'validator';

const phoneNumberValidate = (phoneNumber, setError) => {
  if (phoneNumber === '') {
    setError((prev) => ({
      ...prev,
      phoneNumber: 'Số điện thoại không được để trống!!',
    }));
    return false;
  } else if (!validator.isMobilePhone(phoneNumber)) {
    setError((prev) => ({
      ...prev,
      phoneNumber: 'Số điện thoại không hợp lệ!!',
    }));
    return false;
  } else {
    setError((prev) => ({ ...delete prev.phoneNumber }));
    return true;
  }
};

const fullNameValidate = (fullName, setError) => {
  if (fullName === '') {
    setError((prev) => ({
      ...prev,
      fullName: 'Tên người dùng không được để trống',
    }));
    return false;
  } else {
    setError((prev) => ({ ...delete prev.fullName }));
    return true;
  }
};

const emailValidate = (email, setError) => {
  if (email === '') {
    setError((prev) => ({ ...prev, email: 'Email không được để trống' }));
    return false;
  } else if (!validator.isEmail(email)) {
    setError((prev) => ({ ...prev, email: 'Email không hợp lệ' }));
    return false;
  } else {
    setError((prev) => ({ ...delete prev.email }));
    return true;
  }
};

const passwordValidate = (password, setError) => {
  if (password === '') {
    setError((prev) => ({ ...prev, password: 'Mật khẩu không được để trống' }));
    return false;
  } else if (password.length < 6) {
    setError((prev) => ({
      ...prev,
      password: 'Mật khẩu phải có ít nhất 6 ký tự',
    }));
    return false;
  } else {
    setError((prev) => ({ ...delete prev.password }));
    return true;
  }
};

const confirmPasswordValidate = (password, confirmPassword, setError) => {
  console.log(password, confirmPassword);
  if (confirmPassword === '') {
    setError((prev) => ({
      ...prev,
      confirmPassword: 'Xác nhận mật khẩu không được để trống',
    }));
    return false;
  } else if (confirmPassword !== password) {
    setError((prev) => ({
      ...prev,
      confirmPassword: 'Xác nhận mật khẩu không đúng',
    }));
    return false;
  } else {
    setError((prev) => ({ ...delete prev.confirmPassword }));
    return true;
  }
};

export {
  phoneNumberValidate,
  fullNameValidate,
  emailValidate,
  passwordValidate,
  confirmPasswordValidate,
};
