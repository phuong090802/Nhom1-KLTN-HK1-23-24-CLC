// handle return result of pagination with input
async function handlePagination(queryAPI, size, page) {
  let records = await queryAPI.query;
  const numberOfRecord = records.length;
  records = await queryAPI.pagination().query.clone();
  const pages = Math.ceil(numberOfRecord / +size);
  return { records, page: +page, pages };
}

export const handleReminderPagination = async ({
  data,
  page,
  size,
  handler,
}) => {
  const startIndex = (page - 1) * size; // start
  const endIndex = page * size; // end
  let count = 0;
  const transformedData = [];
  for (const dataPoint of data) {
    if (count >= endIndex) {
      break;
    }

    const result = await handler(dataPoint);
    if (result) {
      transformedData.push(result);
      count++;
    }
  }

  const records = transformedData.slice(startIndex, endIndex);
  const pages = Math.ceil(records.length / size);
  return { records, page, pages };
};

export default handlePagination;
