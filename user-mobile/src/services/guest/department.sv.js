import API from '../api';

const getDepsSv = () => {
  return API.get('departments');
};

const getDepFieldsSv = (depId) => {
  return API.get(`departments/${depId}/fields`);
};

export { getDepsSv, getDepFieldsSv };
