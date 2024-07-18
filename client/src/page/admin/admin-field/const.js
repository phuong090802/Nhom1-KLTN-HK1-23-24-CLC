import { ruleList } from "../../../molecule/my-form";

export const initParams = {
  page: 0,
  size: 5,
  search: ["fieldName"],
  keyword: "",
};

export const modalName = {
  addGeneralField: "AddGeneralFieldModal",
};

export const initAddFieldForm = {
  id: "admin-add-general-field-form",
  inputs: [
    {
      label: "Tên lĩnh vực",
      name: "fieldName",
      type: "text",
      rules: [ruleList.isRequired()],
    },
  ],
};
