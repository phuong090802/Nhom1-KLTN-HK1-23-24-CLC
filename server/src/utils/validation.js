// check mime type of file
export function isSupportedMimetype(supportedMimeTypes, file) {
  const { mimetype } = file;
  return supportedMimeTypes.includes(mimetype);
}

// // check limit file size
// export function isSupportFileSize(fileSize, file) {
//   return file.size < fileSize;
// }
