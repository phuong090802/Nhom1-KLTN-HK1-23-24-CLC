import { ruleList } from "../../../molecule/my-form";

const initParams = {
  search: ["fieldName"],
  keyword: "",
  page: 1,
  size: 5,
  filter: {
    isActive: null,
  },
  sort: {
    // -1 z -> a
    //  1 a ->
    fieldName: 1,
  },
};

const initFilter = [
  {
    label: { key: "Trạng thái", value: "isActive" },
    data: [
      { key: "Không có", value: null },
      { key: "Hoạt động", value: true },
      { key: "Không hoạt động", value: false },
    ],
  },
];

const initSort = [
  {
    label: { key: "Tên lĩnh vực", value: "fieldName" },
    data: [1, -1],
  },
];

const initAddFieldForm = {
  id: "dephead-add-field-form",
  inputs: [
    {
      label: "Tên lĩnh vực",
      name: "fieldName",
      type: "text",
      rules: [ruleList.isRequired()],
    },
  ],
};
export { initParams, initFilter, initSort, initAddFieldForm };
