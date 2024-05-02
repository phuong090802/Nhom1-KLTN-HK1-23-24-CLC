import attribute from '../../../../constants/mapper/attribute.js';
import User from '../../../../models/user.js';
import ErrorHandler from '../../../../util/error/http-error-handler.js';
import catchAsyncErrors from '../../../middlewares/catch-async-errors.js';

// Endpoint: /api/admin/counsellors/upload
// Method: POST
// Description: Import dữ liệu COUNSELLOR từ file .csv
export const handleCreateCounsellorFromCSV = catchAsyncErrors(
  async (req, res, next) => {
    const csvBuffer = req.file.buffer;
    const failCounsellorInserted = [];
    const counsellors = [];
    const password = bcrypt.hashSync(
      process.env.DEFAULT_COUNSELLOR_PASSWORD,
      10
    );

    await new Promise((resolve) => {
      streamifier
        .createReadStream(csvBuffer)
        .pipe(csvParser())
        .on('data', async (data) => {
          if (
            data.Phone_Number &&
            !data.Phone_Number.startsWith('0') &&
            data.Phone_Number.trim().length > 0 &&
            data.Phone_Number.trim().length < 10
          ) {
            data.Phone_Number = '0' + data.Phone_Number.trim();
          }
          counsellors.push({
            fullName: data.FullName,
            email: data.Email,
            phoneNumber: data.Phone_Number,
            password,
            role: 'COUNSELLOR',
          });
        })
        .on('end', () => {
          resolve();
        });
    });

    try {
      await User.insertMany(counsellors, { ordered: false });
    } catch (err) {
      if (err.writeErrors) {
        err.writeErrors.forEach((writeError) => {
          const errorIndex = writeError.index;
          const erroredCounsellor = counsellors[errorIndex];
          delete erroredCounsellor.password;
          const errorMessage = writeError.err.errmsg;
          let message = 'Lỗi trùng lập giá trị';
          const match = errorMessage.match(/{\s*(\w+): "([^"]+)"\s*}/);
          if (match) {
            const key = match[1];
            const value = match[2];
            message = `'${attribute[key]}: ${value}' đã được sử dụng`;
          }
          failCounsellorInserted.push({
            ...erroredCounsellor,
            message,
          });
        });
      }
    }
    res.status(201).json({
      success: true,
      message: 'Thêm tư vấn viên từ file .csv thành công',
      code: 2048,
      failCounsellorInserted,
    });
  }
);

// Endpoint: /api/admin/counsellor
// Method: POST
// Description: Thêm tư vấn viên chưa có khoa vào 1 khoa cụ thể
export const handlerAddCounsellorDepartmentIsNullToDepartment =
  catchAsyncErrors(async (req, res, next) => {
    const user = req.foundUser;
    if (user.counsellor.department) {
      return next(new ErrorHandler(400, 'Tư vấn viên đã được có khoa', 4031));
    }
    const department = req.foundDepartment;
    user.counsellor.department = department;
    await user.save();
    res.status(201).json({
      success: true,
      message: 'Thêm tư vấn viên vào khoa thành công',
      code: 2013,
    });
  });
