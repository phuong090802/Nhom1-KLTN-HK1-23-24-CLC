import { deleteObject, ref } from 'firebase/storage';
import { nanoid } from 'nanoid';
import path from 'path';

import storage from '../config/firebase-init.js';

export const deleteFile = async (strRef) => {
  const storageRef = ref(storage, strRef);
  await deleteObject(storageRef);
};

export const uploadFileSocketIO = async (folder, file) => {
  const extension = path.extname(file.originalname);
  const filename = nanoid() + extension;
  const fileRef = `${folder}/${filename}`;
  const storageRef = ref(storage, fileRef);
  await uploadBytes(storageRef, new Uint8Array(file.buffer));
  const url = await getDownloadURL(storageRef);
  return { ref: fileRef, url };
};
