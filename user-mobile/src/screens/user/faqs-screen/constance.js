const initParams = {
  search: ["question"],
  keyword: "",
  keyword: null,
  page: 1,
  size: 10,
  filter: {
    department: null,
    field: null,
  },
  sort: {
    // -1 z -> a
    //  1 a ->
    createdAt: 1,
  },
};

export { initParams };
