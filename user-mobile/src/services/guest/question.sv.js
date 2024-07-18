import API from '../api';
import { authHeader } from '../requestHeader';

const getQuestionsSv = (params) => {
  return API.get('mobile/questions', {
    params: params,
  });
};

const createQuestionSv = (data) => {
  const tokenHeader = authHeader();
  return API.post('user/questions', data, {
    headers: { 'Content-Type': 'multipart/form-data', ...tokenHeader },
  });
};

const getMyQuestionsSv = async (params) => {
  const header = await authHeader();
  return API.get('user/questions', {
    params: params,
    headers: header,
  });
};

export { createQuestionSv, getMyQuestionsSv, getQuestionsSv };
