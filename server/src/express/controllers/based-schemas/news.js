import News from '../../../models/news.js';
import QueryTransform from '../../../util/db/query-transform.js';
import handlePagination from '../../../util/db/pagination.js';
import QueryAPI from '../../../util/db/query-api.js';
import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

// Endpoint: /api/news
// Method: GET
// Description: Lấy danh sách tin tức trong hệ thống, phân trang, tìm kiếm, sắp xếp
export const handleGetAllNews = catchAsyncErrors(async (req, res, next) => {
  const query = News.find().select('title content file.url createdAt').lean();
  const reqSort = req.query.sort?.createdAt;
  const queryTransform = new QueryTransform(req.query).defaultSortNewest({
    ...(!reqSort && { createdAt: -1 }),
  });
  const queryAPI = new QueryAPI(query, queryTransform.query)
    .search()
    .filter()
    .sort();
  const {
    records: retListNews,
    page,
    pages,
  } = await handlePagination(queryAPI, req.query.size, req.query.page);
  const listNews = retListNews.map((news) => ({
    ...news,
    file: news.file.url,
  }));
  res.json({
    success: true,
    listNews,
    page,
    pages,
    code: 2078,
  });
});
