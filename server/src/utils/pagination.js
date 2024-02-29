const paginateResults = (
  numberOfRecord,
  pageRequest,
  sizeRequest,
  totalRecords
) => {
  const totalPages = Math.ceil(numberOfRecord / +sizeRequest);
  return { data: totalRecords, page: +pageRequest, pages: totalPages };
};

export default paginateResults;
