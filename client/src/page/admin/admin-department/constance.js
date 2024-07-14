import { ruleList } from '../../../molecule/my-form';

const initParams = {
  search: ['departmentName'],
  keyword: '',
  page: 1,
  size: 5,
  filter: {
    isActive: null,
  },
  sort: {
    departmentName: 1,
  },
};

const initFilter = [
  {
    label: { key: 'Trạng thái', value: 'isActive' },
    data: [
      { key: 'Không có', value: null },
      { key: 'Hoạt động', value: true },
      { key: 'Không hoạt động', value: false },
    ],
  },
];

const initSort = [
  {
    label: { key: 'Tên khoa', value: 'departmentName' },
    data: [1, -1],
  },
];

const formUpdateDep = {
  id: 'update-department-form',
  inputs: [
    {
      label: 'Tên khoa',
      name: 'departmentName',
      type: 'text',
      rules: [ruleList.isRequired()],
    },
  ],
};

const formAddDep = {
  id: 'add-department-form',
  inputs: [
    {
      label: 'Tên khoa',
      name: 'departmentName',
      type: 'text',
      rules: [ruleList.isRequired()],
    },
  ],
};
export { formAddDep, formUpdateDep, initFilter, initParams, initSort };

