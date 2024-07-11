const initParams = {
  search: ["fullName", "email", "phoneNumber"],
  keyword: "",
  page: 1,
  size: 10,
  filter: {
    role: null,
    isEnabled: null,
    Occupation: null,
  },
  sort: {
    fullName: null,
  },
};

const sortData = [
  { text: "Tên người dùng A-z", value: { fullName: 1 } },
  { text: "Tên người dùng Z-a", value: { fullName: -1 } },
];

const filterData = [
  {
    name: "isEnabled",
    label: "Hoạt động",
    data: [
      {
        key: "Hoạt động",
        value: true,
      },
      {
        key: "Không hoạt động",
        value: false,
      },
    ],
  },
  {
    name: "role",
    label: "Chức vụ",
    data: [
      {
        key: "Tất cả",
        value: null,
      },
      {
        key: "Người dùng",
        value: "USER",
      },
      {
        key: "Tư vấn viên",
        value: "COUNSELLOR",
      },
      {
        key: "Trưởng khoa",
        value: "DEPARTMENT_HEAD",
      },
    ],
  },
  {
    name: "Occupation",
    label: "Nghề nghiệp",
    data: [
      {
        key: "Tất cả",
        value: null,
      },
      {
        key: "Sinh viên",
        value: "Sinh viên",
      },
    ],
  },
];

export { initParams, sortData, filterData };
