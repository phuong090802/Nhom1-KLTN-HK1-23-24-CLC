import API from '../api.sv';
import { authorHeader, createHeader } from '../serviceHeader';

const depheadGetFaqsSv = (params) => {
  return API.get('department-head/faqs', {
    headers: authorHeader(),
    params: params,
  });
};

const depheadCreateFaqSv = (data) => {
  return API.post('department-head/faqs', data, {
    headers: createHeader(['authorization', 'formDataType']),
  });
};

const depheadDeleteFaqSv = (id) => {
  return API.delete(`department-head/faqs/${id}`, {
    headers: authorHeader(),
  });
};

export { depheadCreateFaqSv, depheadDeleteFaqSv, depheadGetFaqsSv };

