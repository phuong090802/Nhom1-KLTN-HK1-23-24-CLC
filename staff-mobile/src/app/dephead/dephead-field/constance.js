const initParams = {
  search: ["fieldName"],
  keyword: "",
  page: 1,
  size: 10,
  filter: {
    isActive: null,
  },
  sort: {
    fieldName: null,
  },
};

const sortData = [
  { text: "Tên lĩnh vực A-z", value: { fieldName: 1 } },
  { text: "Tên lĩnh vực Z-a", value: { fieldName: -1 } },
];

const filterData = [
  {
    name: "isActive",
    label: "Hoạt động",
    data: [
      {
        key: "Tất cả",
        value: null,
      },
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
