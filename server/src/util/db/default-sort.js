export default function defaultSortNewest(requestQuery, sortValue) {
  let query = {
    ...requestQuery,
    sort: {
      ...requestQuery.sort,
      ...sortValue,
    },
  };

  // console.log(query);

  return query;
}
