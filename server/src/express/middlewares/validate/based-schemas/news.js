import News from '../../../../models/news.js';
import ErrorHandler from '../../../../util/error/http-error-handler.js';
import catchAsyncErrors from '../../catch-async-errors.js';

// kiểm tra mã của tin tức
export const handleValidateNewsIdInParams = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    const news = await News.findById(id);
    if (!news) {
      return next(new ErrorHandler(404, 'Không tìm thấy tin tức', 4063));
    }
    req.foundNews = news;
    next();
  }
);
