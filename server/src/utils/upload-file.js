import { deleteObject, ref } from 'firebase/storage';

import storage from '../configs/firebase-init.js';

export const deleteFile = async (strRef) => {
  const storageRef = ref(storage, strRef);
  await deleteObject(storageRef);
};
