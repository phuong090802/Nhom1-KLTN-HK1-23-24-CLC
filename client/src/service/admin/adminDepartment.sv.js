import API from '../api.sv';
import { authorHeader } from '../serviceHeader';

const getDepartmentsSv = (params) => {
  return API.get('admin/departments', {
    headers: authorHeader(),
    params: params,
  });
};

const addDepSv = (data) => {
  return API.post('admin/departments', data, { headers: authorHeader() });
};

const updateDepStatusSv = (depId, data) => {
  return API.patch(`admin/departments/${depId}`, data, {
    headers: authorHeader(),
  });
};

const updateDepSv = (depId, data) => {
  return API.put(`admin/departments/${depId}`, data, {
    headers: authorHeader(),
  });
};

const getDepCounsellorsSv = (depId, params) => {
  return API.get(`admin/departments/${depId}/counsellors`, {
    headers: authorHeader(),
    params: params,
  });
};

const chooseDepheadSv = (data) => {
  return API.put('admin/departments', data, {
    headers: authorHeader(),
  });
};

const getCounsellorsToAddSv = () => {
  return API.get(`admin/counsellors`, {
    headers: authorHeader(),
  });
};

const addCounsellorToDep = (data) => {
  return API.post('admin/counsellors', data, { headers: authorHeader() });
};

export {
  addCounsellorToDep,
  addDepSv,
  chooseDepheadSv,
  getCounsellorsToAddSv,
  getDepartmentsSv,
  getDepCounsellorsSv,
  updateDepStatusSv,
  updateDepSv
};

