import News from '../../../models/news.js';
import defaultSortNewest from '../../../utils/db/default-sort.js';
import paginate from '../../../utils/db/paginate.js';
import QueryAPI from '../../../utils/db/query-api.js';
import catchAsyncErrors from '../../middlewares/catch-async-errors.js';

// Endpoint: /api/news
// Method: GET
// Description: Lấy danh sách tin tức trong hệ thống, phân trang, tìm kiếm, sắp xếp
export const handleGetAllNews = catchAsyncErrors(async (req, res, next) => {
  const query = News.find().select('title content file.url createdAt').lean();

  const reqSort = req.query.sort?.createdAt;

  const requestQuery = defaultSortNewest(
    req.query,
    !reqSort && { createdAt: -1 }
  );

  const queryAPI = new QueryAPI(query, requestQuery).search().filter().sort();
  let newsRecords = await queryAPI.query;
  const numberOfNews = newsRecords.length;
  newsRecords = await queryAPI.pagination().query.clone();

  const {
    data: retListNews,
    page,
    pages,
  } = paginate(numberOfNews, req.query.page, req.query.size, newsRecords);

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
