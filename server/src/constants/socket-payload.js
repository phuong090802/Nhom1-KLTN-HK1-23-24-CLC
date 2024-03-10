export const defaultPayloadForPaginationQuestions = {
  search: ['title', 'content'],
  keyword: null,
  page: 1,
  size: 5,
  filter: {},
  sort: {
    views: 1,
    createdAt: 1,
  },
};

export const defaultPayloadForPaginationFeedbacks = {
  search: ['content'],
  keyword: null,
  page: 1,
  size: 5,
  filter: {},
  sort: {
    // createdAt: 1,
  },
};

// export const defaultPayloadForPaginationQuestions = {
//   search: ['title', 'content'],
//   keyword: null,
//   page: 1,
//   size: 5,
//   filter: {
//     //   "departmentId": "departmentId",
//     //   "fieldId": "fieldId"
//   },
//   sort: {
//     //  -1 z -> a
//     //  1 a ->
//     views: 1,
//     createdAt: 1,
//   },
// };
