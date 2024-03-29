export default function queryFiltersLimit(requestQuery, ...filterLimit) {
  console.log(...filterLimit);

  return {
    ...requestQuery,
    filter: {
      ...requestQuery.filter,
      ...filterLimit,
    },
  };
}
