const findKeyValueObject = (object: Object, key: String) => {
  const foundEntry = Object.entries(object).find(([k, v]) => k === key);
  const resultObject = foundEntry ? { [foundEntry[0]]: foundEntry[1] } : {};
  return resultObject;
};

const getKeyByValue = (data: any, value: any) => {
  if (data === undefined) return null;

  const temp = data.find((option) => {
    return option.value === value;
  });

  return temp?.key || null;
};

const deleteValueFromArray = (array: Array<any>, value: any) => {
  if (array.includes(value)) {
    const index = array.indexOf(value);
    return array.splice(index, 1);
  } else return array;
};

export { deleteValueFromArray, findKeyValueObject, getKeyByValue };
