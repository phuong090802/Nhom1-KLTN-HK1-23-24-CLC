import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path';

import storage from '../../configs/firebase-init.js';

import { mimetype } from '../../constants/file.js';
import ErrorHandler from '../../utils/error-handler.js';
import { isSupportedMimetype } from '../../utils/validation.js';
import catchAsyncErrors from './catch-async-errors.js';

export const uploadImageOrDocumentHandler = multer({
  limits: { fieldSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: function (req, file, cb) {
    if (isSupportedMimetype([...mimetype.image, ...mimetype.document], file)) {
      cb(null, true);
    } else {
      cb(new ErrorHandler(400, 'Định dạng file không hỗ trợ', 4050));
    }
  },
});

export const uploadFileToFirebaseHandler = (folder) => {
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
