import { createHeader } from '../../util/service.util';
import API from '../api';

export const adminGetDepSv = async (params) => {
  const header = await createHeader(['author']);
  return API.get('admin/departments', {
    headers: header,
    params,
  });
};

export const adminDepStatusSv = async (depId, data) => {
  const header = await createHeader(['author']);
  return API.patch(`admin/departments/${depId}`, data, {
    headers: header,
  });
};

export const adminUpdateDepSv = async (data) => {
  const header = await createHeader(['author']);
  return API.put(
    `admin/departments/${data._id}`,
    { departmentName: data.departmentName },
    {
      headers: header,
    }
  );
};

export const adminAddDepSv = async (departmentName) => {
  const header = await createHeader(['author']);
  return API.post(
    'admin/departments',
    { departmentName },
    {
      headers: header,
    }
  );
};

export const adminGetDepCounsellorSv = async (depId, params) => {
  const header = await createHeader(['author']);
  return API.get(`admin/departments/${depId}/counsellors`, {
    headers: header,
    params,
  });
};

export const chooseDepheadSv = async (data) => {
  const header = await createHeader(['author']);
  return API.put('admin/departments', data, {
    headers: header,
  });
};
