export default function defaultSortNewest(requestQuery, sortValue) {
  let query = {
    ...requestQuery,
    sort: {
      ...requestQuery.sort,
      ...sortValue,
    },
  };
  return query;
}
