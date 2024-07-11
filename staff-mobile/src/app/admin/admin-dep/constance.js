const initParams = {
  search: ["departmentName"],
  keyword: "",
  page: 1,
  size: 10,
  filter: {
    // isActive: true,
  },
  sort: {
    // -1 z -> a
    //  1 a ->
    // departmentName: 1,
  },
};

const sortData = [
  { text: "Tên khoa A-z", value: { departmentName: 1 } },
  { text: "Tên khoa Z-a", value: { departmentName: -1 } },
];

const filterData = [
  {
    name: "isActive",
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
];

export { initParams, sortData, filterData };
