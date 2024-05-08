import QueryAPI from './query-api.js';

async function handleSkipAndLimit(query, queryTransform) {
  const queryAPI = new QueryAPI(query, queryTransform).search().filter().sort();
  let records = await queryAPI.query;
  const totals = records.length;
  records = await queryAPI.skipAndLimit().query.clone();
  return {
    totals,
    records,
  };
}

export default handleSkipAndLimit;
