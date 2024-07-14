import API from '../api.sv';
import { authorHeader } from '../serviceHeader';

const depheadGetCounsellorsSv = (params) => {
  return API.get('department-head/counsellors', {
    headers: authorHeader(),
    params: params,
  });
};

const depheadAddCounsellorSv = (data) => {
  return API.post('department-head/counsellors', data, {
    headers: authorHeader(),
  });
};

const depheadUpdateCounsellorStatusSv = (counsellorId, data) => {
  return API.patch(`department-head/counsellors/${counsellorId}`, data, {
    headers: authorHeader(),
  });
};

const getFieldToAddForCounSv = (counsellorId) => {
  return API.get(`department-head/counsellors/${counsellorId}`, {
    headers: authorHeader(),
  });
};

const addFieldsForCounSv = (counsellorId, fieldIds) => {
  return API.put(
    `department-head/counsellors/${counsellorId}`,
    { fieldIds },
    {
      headers: authorHeader(),
    }
  );
};

const deleteFieldsForCounSv = (counsellorId, fieldId) => {
  return API.delete(`department-head/counsellors/${counsellorId}`, {
    headers: authorHeader(),
    data: { fieldId },
  });
};

export {
  addFieldsForCounSv,
  deleteFieldsForCounSv, depheadAddCounsellorSv, depheadGetCounsellorsSv, depheadUpdateCounsellorStatusSv,
  getFieldToAddForCounSv
};

