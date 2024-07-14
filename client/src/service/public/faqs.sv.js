import API from '../api.sv';

const getFaqsSv = (params) => {
  return API.get('faqs', {
    params: params,
  });
};

export { getFaqsSv };

