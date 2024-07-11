import { ruleList } from "../../../molecule/my-form";

const initParams = {
  search: ["fullName", "email", "phoneNumber"],
  keyword: "",
  page: 1,
  size: 5,
  filter: {
    role: null,
    isEnabled: null,
    Occupation: null,
  },
  sort: {
    // -1 z -> a
    //  1 a ->
    fullName: 1,
    role: 1,
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
  {
    label: { key: "Nghề nghiệp", value: "occupation" },
    data: [
      { key: "Không có", value: null },
      { key: "Sinh viên", value: "Sinh viên" },
      { key: "Cựu sinh viên", value: "Cựu sinh viên" },
      { key: "Phụ huynh", value: "Phụ huynh" },
    ],
  },
  {
    label: { key: "Chức vụ", value: "role" },
    data: [
      { key: "Không có", value: null },
      { key: "Người dùng", value: "USER" },
      { key: "Tư vấn viên", value: "COUNSELLOR" },
      { key: "Trưởng khoa", value: "DEPARTMENT_HEAD" },
      { key: "Giám sát viên", value: "SUPERVISOR" },
    ],
  },
];

const initSort = [
  {
    label: { key: "Họ & Tên", value: "fullName" },
    data: [1, -1],
  },
  {
    label: { key: "Chức vụ", value: "role" },
    data: [1, -1],
  },
];

const formAddStaff = {
  id: "add-department-form",
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
      rules: [ruleList.isRequired(), ruleList.isEmail],
    },
    {
      label: "Số điện thoại",
      name: "phoneNumber",
      type: "tel",
      rules: [ruleList.isRequired(), ruleList.isMobilePhone],
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
      rules: [ruleList.isRequired(), ruleList.isConfirm("password")],
    },
  ],
};

export { initParams, initFilter, initSort, formAddStaff };
