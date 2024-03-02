export function isSupportedMimetype(supportedMimeTypes, file) {
  const { mimetype } = file;
  return supportedMimeTypes.includes(mimetype);
}

export function isSupportFileSize(fileSize, file) {
  return file.size < fileSize;
}
