import { createHeader } from '../../util/service.util';
import API from '../api';

export const depheadGetFieldSv = async (params) => {
  const header = await createHeader(['author']);
  return API.get('department-head/fields', {
    headers: header,
    params,
  });
};

export const depheadUpdateFieldStatusSv = async (fieldId, data) => {
  const header = await createHeader(['author']);
  return API.patch(`department-head/fields/${fieldId}`, data, {
    headers: header,
  });
};

export const depheadAddFieldSv = async (fieldName) => {
  const header = await createHeader(['author']);
  return API.post(
    'department-head/fields',
    { fieldName },
    {
      headers: header,
    }
  );
};

export const depheadUpdateFieldSv = async (fieldId, fieldName) => {
  const header = await createHeader(['author']);
  return API.put(
    `department-head/fields/${fieldId}`,
    { fieldName },
    {
      headers: header,
    }
  );
};

export const getDepartmentFieldSv = async (departmentId) => {
  return API.get(`departments/${departmentId}/fields`);
};

export const forwardQuestionSv = async (questionId, data) => {
  const header = await createHeader(['author']);
  return API.put(`counsellor/questions/${questionId}`, data, {
    headers: header,
  });
};
