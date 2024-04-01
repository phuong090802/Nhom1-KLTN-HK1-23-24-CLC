export default function queryFiltersLimit(requestQuery, ...filterLimit) {
  // console.log(filterLimit);

  let query = {
    ...requestQuery,
    filter: {
      ...requestQuery.filter,
    },
  };

  filterLimit.forEach((ft) => {
    Object.keys(ft).forEach((key) => {
      const value = ft[key];
      if (value !== undefined) {
        query.filter[key] = value;
      }
    });
  });

  console.log(query);

  return query;
}
