const initParams = {
  search: ["title", "content"],
  keyword: "",
  page: 1,
  size: 5,
  filter: {
    field: null,
  },
  sort: {
    createdAt: 1,
  },
};

const initFilter = [
  {
    label: { key: "Lĩnh vực", value: "field" },
    data: [{ key: "Không có", value: null }],
  },
];

const initSort = [
  {
    label: { key: "Ngày tạo", value: "createdAt" },
    data: [1, -1],
  },
];

export { initParams, initFilter, initSort };
