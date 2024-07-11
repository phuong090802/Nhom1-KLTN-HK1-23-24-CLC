const getMonth = (dateString) => {
  const date = new Date(dateString);
  return date.getMonth() + 1;
};

export { getMonth };
