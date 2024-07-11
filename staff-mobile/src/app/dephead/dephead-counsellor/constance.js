const initParams = {
  search: ["fullName"],
  keyword: "",
  page: 1,
  size: 10,
  filter: {
    isEnabled: null,
  },
  sort: {
    // -1 z -> a
    //  1 a ->
    fieldName: null,
  },
};

const sortData = [
  { text: "Tên lĩnh vực A-z", value: { fieldName: 1 } },
  { text: "Tên lĩnh vực Z-a", value: { fieldName: -1 } },
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
];

export { initParams, sortData, filterData };
