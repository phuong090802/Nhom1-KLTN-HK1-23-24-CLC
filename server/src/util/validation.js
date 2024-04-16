// check mime type of file
export function isSupportedMimetype(supportedMimeTypes, file) {
  const { mimetype } = file;
  return supportedMimeTypes.includes(mimetype);
}

export function hasArrayMaxLength(array, maxLength) {
  return array.length <= maxLength;
}

// check limit file size
export function isSupportFileSize(maxSize, file) {
  return file.size <= maxSize;
}

