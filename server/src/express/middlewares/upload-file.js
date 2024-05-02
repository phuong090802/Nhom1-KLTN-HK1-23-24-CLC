import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path';

import storage from '../../config/firebase-init.js';
import mimetype from '../../constants/file/mimetype.js';
import ErrorHandler from '../../util/error/http-error-handler.js';
import { isSupportedMimetype } from '../../util/validation.js';
import catchAsyncErrors from './catch-async-errors.js';

// handle limit file size and check ext of file (image or document)
export const handleUploadImageOrDocument = multer({
  limits: { fieldSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: function (req, file, cb) {
    if (isSupportedMimetype([...mimetype.image, ...mimetype.document], file)) {
      cb(null, true);
    } else {
      cb(new ErrorHandler(400, 'Định dạng file không hỗ trợ', 4050));
    }
  },
});

// handle upload file to firebase with input folder (optional)
export const handleOptionalUploadFileToFirebase = (folder) => {
  return catchAsyncErrors(async (req, res, next) => {
    const uploadedFile = {
      ref: null,
      url: null,
    };
    if (req.file) {
      const extension = path.extname(req.file.originalname);
      const filename = nanoid() + extension;
      const fileRef = `${folder}/${filename}`;
      const storageRef = ref(storage, fileRef);
      await uploadBytes(storageRef, new Uint8Array(req.file.buffer));
      const url = await getDownloadURL(storageRef);
      uploadedFile.ref = fileRef;
      uploadedFile.url = url;
    }
    req.uploadedFile = uploadedFile;
    next();
  });
};

// handle upload file to firebase with input folder (required)
export const handleRequiredUploadFileToFirebase = (folder) => {
  return catchAsyncErrors(async (req, res, next) => {
    if (!req.file) {
      // return next error
      return next(new ErrorHandler(422, 'Không tìm thấy file', 4019));
    }
    const extension = path.extname(req.file.originalname);
    const filename = nanoid() + extension;
    const fileRef = `${folder}/${filename}`;
    const storageRef = ref(storage, fileRef);
    await uploadBytes(storageRef, new Uint8Array(req.file.buffer));
    const url = await getDownloadURL(storageRef);
    const uploadedFile = {
      ref: fileRef,
      url,
    };
    req.uploadedFile = uploadedFile;
    next();
  });
};

// handle limit file size and check ext of file (image)
export const handleUploadImage = multer({
  limits: { fieldSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: function (req, file, cb) {
    if (isSupportedMimetype([...mimetype.image], file)) {
      cb(null, true);
    } else {
      cb(new ErrorHandler(422, 'Định dạng file không hỗ trợ', 4028));
    }
  },
});

// handle limit file size and check ext of file (.csv)
export const handleUploadFileCSV = multer({
  limits: { fieldSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: function (req, file, cb) {
    if (file.mimetype === mimetype.csv) {
      cb(null, true);
    } else {
      cb(new ErrorHandler(422, 'Định dạng file không hỗ trợ', 4082));
    }
  },
});

export const handleRequiredFileInFormData = catchAsyncErrors(
  async (req, res, next) => {
    if (!req.file) {
      return next(new ErrorHandler(400, 'Không tìm thấy file', 4083));
    }
    next();
  }
);
