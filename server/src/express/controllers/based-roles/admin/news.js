import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';
import News from '../../../../models/news.js';
import { deleteFile } from '../../../../util/upload-file.js';
import ErrorHandler from '../../../../util/error/http-error-handler.js';

// Endpoint: /api/admin/news
// Method: POST
// Description: Quản trị viên tạo tin tức
export const handleCreateNews = catchAsyncErrors(async (req, res, next) => {
  const { title, content } = req.body;
  const file = req.uploadedFile;

  await News.create({ title, content, file });

  res.json({
    success: true,
    message: 'Tạo tin tức thành công',
    code: 2075,
  });
});

// Endpoint: /api/admin/news/:id
// Method: PUT
// Description: Quản trị viên cập nhật tin tức
export const handleUpdateNews = catchAsyncErrors(async (req, res, next) => {
  const news = req.foundNews;
  const { title, content } = req.body;
  const file = req.uploadedFile;

  const { ref, url } = news.file;

  if (ref && url) {
    try {
      // remove old file
      await deleteFile(ref);
    } catch (error) {
      // remove new image if error
      if (file.ref && file.url) {
        await deleteFile(file.ref);
      }
      const msg = 'Lỗi cập nhật tin tức. Vui lòng thử lại';
      return next(new ErrorHandler(500, msg, 4110));
    }
  }

  news.file = file;
  news.title = title;
  news.content = content;

  await news.save();

  res.json({
    success: true,
    message: 'Cập nhật tin tức thành công',
    code: 2076,
  });
});

// Endpoint: /api/admin/news/:id
// Method: DELETE
// Description: Quản trị viên xóa tin tức
export const handleDeleteNews = catchAsyncErrors(async (req, res, next) => {
  const news = req.foundNews;
  const { ref, url } = news.file;

  if (ref && url) {
    try {
      // remove file
      await deleteFile(ref);
    } catch (error) {
      return next(
        new ErrorHandler(500, 'Lỗi xóa tin tức. Vui lòng thử lại', 4111)
      );
    }
  }

  await News.findByIdAndDelete(news._id);

  res.json({
    success: true,
    message: 'Xóa tin tức thành công',
    code: 2077,
  });
});
