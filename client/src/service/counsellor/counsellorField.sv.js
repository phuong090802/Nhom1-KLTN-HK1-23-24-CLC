import API from '../api.sv';
import { authorHeader } from '../serviceHeader';

const getMyFieldsSv = () => {
  return API.get('counsellor/fields', {
    headers: authorHeader(),
  });
};

export { getMyFieldsSv };

