import express from 'express';

// import User from '../../models/user.js';
// import QueryAPI from '../../utils/query-api.js';
import catchAsyncErrors from '../middlewares/catch-async-errors.js';
// import {
// setDefaultPaginationParams,
// setUserSearchFieldsParams,
// } from '../middlewares/query.js';
// import paginateData from '../../utils/pagination.js';
// import ErrorHandler from '../../utils/error-handler.js';
import {
  uploadFileToFirebaseHandler,
  uploadImageOrDocumentHandler,
} from '../middlewares/upload-file.js';
// import Department from '../../models/department.js';
// import Counsellor from '../../models/counsellor.js';

const router = express.Router();

const uploadHandler = catchAsyncErrors(async (req, res, next) => {
  const { title, content, departmentId, fieldId } = req.body;
  console.log('departmentId', departmentId);
  console.log('fieldId', fieldId);
  console.log('title', title);
  console.log('content', content);
  const uploadedFile = req.uploadedFile;
  res.end();
});

router.post(
  '/upload',
  uploadImageOrDocumentHandler.single('file'),
  uploadFileToFirebaseHandler('questions'),
  uploadHandler
);
export default router;

// router.post('/departments',)

// router.use(setDefaultPaginationParams, setUserSearchFieldsParams);

// solution
// 1. virtual field department name
// 2. find all userId in counsellor then find user by id in this array
// 3. change ref from counsellor -> user to user -> counsellor
// 4. merge counsellor to user
// 5. use map in users (n record per page not effective performance of application)

// router.get(
//   '/users',
//   catchAsyncErrors(async (req, res, next) => {
//     const queryAPI = new QueryAPI(User.find(), req.query)
//       .search()
//       .filter()
//       .sort();

//     // const currentPage = +req.query.page;

//     let queriedUsers = await queryAPI.query;
//     // total users
//     const totalUsers = queriedUsers.length;
//     // total Page
//     // const totalPages = Math.ceil(totalUsers / +req.query.size);

//     queriedUsers = await queryAPI.pagination().query.clone();

//     const userInfos = await Promise.all(
//       queriedUsers.map((user) => user.getUserInfo())
//     ).catch((reason) => {
//       throw new ErrorHandler(500, reason, 5000);
//     });

//     const {
//       data: users,
//       page,
//       pages: totalPages,
//     } = paginateData(totalUsers, req.query.page, req.query.size, userInfos);

//     res.json({
//       users,
//       page,
//       totalPages,
//     });
//   })
// );

// router.post('/departments', async (req, res, next) => {
//   const { departmentName } = req.body;
//   await Department.create({ departmentName });
//   res.json({
//     success: true,
//     message: 'Thêm khoa thành công',
//   });
// });

// router.post(
//   '/departments/:departmentId/users/:userId',
//   async (req, res, next) => {
//     const { departmentId, userId } = req.params;
//     await Counsellor.create({
//       department: departmentId,
//       user: userId,
//     });

//     res.json({
//       success: true,
//       message: 'Tạo thông tin tư vấn viên thành công',
//     });
//   }
// );
