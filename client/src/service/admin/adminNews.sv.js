import API from '../api.sv';
import { authorHeader, createHeader } from '../serviceHeader';

const getNewsSv = (params) => {
  return API.get('news', {
    params: params,
  });
};

const addNewsSv = (data) => {
  return API.post('admin/news', data, {
    headers: createHeader(['authorization', 'formDataType']),
  });
};

const updateNewsSv = (id, data) => {
  return API.put(`admin/news/${id}`, data, {
    headers: createHeader(['authorization', 'formDataType']),
  });
};

const deleteNewsSv = (id) => {
  return API.delete(`admin/news/${id}`, {
    headers: authorHeader(),
  });
};

export { addNewsSv, deleteNewsSv, getNewsSv, updateNewsSv };

