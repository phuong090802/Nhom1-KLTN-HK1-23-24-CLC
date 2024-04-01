import catchAsyncErrors from '../../catch-async-errors.js';
import ErrorHandler from '../../../../utils/error/http-error-handler.js';
import News from '../../../../models/news.js';

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
