const initParams = {
  search: ['question'],
  keyword: '',
  page: 1,
  size: 5,
  filter: {
    // field: "65e195829eefc7138b7dbd8b",
  },
  sort: {
    // -1 z -> a
    //  1 a ->
    createdAt: 1,
  },
};

const initFaqData = {
  fieldId: '',
  question: '',
  file: null,
};

export { initFaqData, initParams };
