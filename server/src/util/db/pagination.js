// handle return result of pagination with input
async function handlePagination(queryAPI, size, page) {
  let records = await queryAPI.query;
  const numberOfRecord = records.length;
  records = await queryAPI.pagination().query.clone();
  const pages = Math.ceil(numberOfRecord / +size);
  return { records, page: +page, pages };
}

export default handlePagination;
