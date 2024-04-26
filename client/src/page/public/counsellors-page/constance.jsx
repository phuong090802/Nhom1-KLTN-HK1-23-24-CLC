import { Building2 } from "lucide-react";

const initParams = {
  search: ["fullName", "email", "phoneNumber"],
  keyword: "",
  page: 1,
  size: 5,
  filter: {
    // không truyền mã khoa thì lấy tất cả khoa
    // truyền mã khoa isActive = false thì lấy tất cả khoa
    // "counsellor.department": "65d87158b394abe04aad269c",
    "counsellor.department": null,
    // không truyền role thì lấy DEPARTMENT_HEAD và COUNSELLOR
    role: null,
  },
  sort: {
    // -1 z -> a
    //  1 a ->
    "counsellor.department": null,
  },
};

const initSort = [
  {
    icon: <Building2 size={20} />,
    name: "counsellor.department",
    placeholder: "Thời gian đăng",
    data: [
      {
        key: "A-z",
        value: 1,
      },
      {
        key: "Z-a",
        value: -1,
      },
    ],
  },
];

export { initParams, initSort };
