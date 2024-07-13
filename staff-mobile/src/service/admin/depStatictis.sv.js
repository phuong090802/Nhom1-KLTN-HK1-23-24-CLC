import { createHeader } from '../../util/service.util';
import API from '../api';

const getDepStatisticsSv = async (params) => {
  const header = await createHeader(['author']);
  return API.get('admin/statistics/department', {
    headers: header,
    params,
  });
};

const getSystemStatictisSv = async () => {
  const header = await createHeader(['author']);
  return API.get('statistics', {
    headers: header,
  });
};

const getQuesStatisticDataSv = async (data, params) => {
  const header = await createHeader(['author']);
  return API.post(
    'admin/statistics/question',
    {
      timeUnit: 'month', // year
      latestTime: 4,
    },
    {
      headers: header,
      params,
    }
  );
};

const getDepStatisticById = async (depId, params) => {
  const header = await createHeader(['author']);
  return API.post(
    `admin/statistics/department/${depId}/question`,
    {
      timeUnit: 'month', //year
      latestTime: 4,
    },
    {
      headers: header,
      params: params,
    }
  );
};

export {
  getDepStatisticById, getDepStatisticsSv,
  getQuesStatisticDataSv,
  getSystemStatictisSv
};

