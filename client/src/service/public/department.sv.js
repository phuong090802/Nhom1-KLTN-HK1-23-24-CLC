import API from '../api.sv';

const getDepartmentsListSv = () => {
  return API.get('departments');
};

const getFieldListSv = (departmentId) => {
  return API.get(`departments/${departmentId}/fields`);
};

export { getDepartmentsListSv, getFieldListSv };

