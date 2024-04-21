import isEmail from "validator/lib/isemail";
import { ruleList } from "../../../molecule/my-form";

const initParams = {
  search: ["fullName"],
  keyword: "",
  page: 1,
  size: 5,
  filter: {
    isEnabled: null,
    role: null,
  },
  sort: {
    // -1 z -> a
    //  1 a ->
    fieldName: 1,
  },
};

const initFilter = [
  {
    label: { key: "Trạng thái", value: "isEnabled" },
    data: [
      { key: "Không có", value: null },
      { key: "Hoạt động", value: true },
      { key: "Không hoạt động", value: false },
    ],
  },
  // {
  //   label: { key: "Chức vụ", value: "role" },
  //   data: [
  //     { key: "Không có", value: null },
  //     { key: "Người dùng", value: "USER" },
  //     { key: "Tư vấn viên", value: "COUNSELLOR" },
  //     { key: "Trưởng khoa", value: "DEPARTMENT_HEAD" },
  //     { key: "Giám sát viên", value: "SUPERVISOR" },
  //   ],
  // },
];

const initSort = [
  {
    label: { key: "Họ & Tên", value: "fullName" },
    data: [1, -1],
  },
];

const initAddCounsellorForm = {
  id: "dephead-add-counsellor-form",
  inputs: [
    {
      label: "Họ & Tên",
      name: "fullName",
      type: "text",
      rules: [ruleList.isRequired()],
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      rules: [ruleList.isRequired(), ruleList.isEmail()],
    },
    {
      label: "Số điện thoại",
      name: "phoneNumber",
      type: "tel",
      rules: [ruleList.isRequired(), ruleList.isMobilePhone()],
    },
    {
      label: "Mật khẩu",
      name: "password",
      type: "password",
      rules: [ruleList.isRequired(), ruleList.minLength(6)],
    },
    {
      label: "Xác nhận mật khẩu",
      name: "confirmPassword",
      type: "password",
      rules: [
        ruleList.isRequired(),
        ruleList.minLength(6),
        ruleList.isConfirm("password"),
      ],
    },
  ],
};

export { initParams, initFilter, initSort, initAddCounsellorForm };
