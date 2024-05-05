class QueryTransform {
  constructor(requestQuery) {
    this.requestQuery = requestQuery;
    this.query = { ...requestQuery };
  }

  defaultSortNewest(sortValue) {
    this.query.sort = {
      ...this.query.sort,
      ...sortValue,
    };
    return this;
  }

  applyFilters(filterObject) {
    const filter = { ...this.query.filter, ...filterObject };
    this.query.filter = filter;
    return this;
  }
}

export default QueryTransform;
