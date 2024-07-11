const initParams = {
  search: ["question"],
  keyword: "",
  keyword: null,
  page: 1,
  size: 5,
  filter: {
    field: null,
  },
  sort: {
    createdAt: null,
  },
};

const sortData = [
  { text: "Mới nhất", value: { createdAt: 1 } },
  { text: "Cũ nhất", value: { createdAt: -1 } },
];

const filterInitData = [
  {
    name: "field",
    label: "Lĩnh vực",
    data: [],
  },
];
export { initParams, sortData, filterInitData };
