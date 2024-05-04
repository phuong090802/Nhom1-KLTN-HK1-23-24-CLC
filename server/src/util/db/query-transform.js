class QueryTransform {
  constructor(requestQuery) {
    this.requestQuery = requestQuery;
  }

  defaultSortNewest(sortValue) {
    this.query = {
      ...this.requestQuery,
      sort: {
        ...this.requestQuery.sort,
        ...sortValue,
      },
    };
    return this;
  }

  applyFilters(filterObject) {
    const filter = { ...this.requestQuery.filter, ...filterObject };
    this.query = {
      ...this.requestQuery,
      filter,
    };
    return this;
  }
}

export default QueryTransform;
