import API from '../api';
import { authHeader } from '../requestHeader';

const getQuestionsSv = (params) => {
  console.log(params.skip);
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

const getMyQuestionsSv = (params) => {
  return API.get('user/questions', {
    params: params,
    headers: authHeader(),
  });
};

export { getQuestionsSv, createQuestionSv, getMyQuestionsSv };
