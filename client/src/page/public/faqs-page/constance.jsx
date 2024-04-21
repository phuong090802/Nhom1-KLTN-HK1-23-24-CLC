import { Clock } from "lucide-react";

const initParams = {
  search: ["question"],
  keyword: "",
  keyword: null,
  page: 1,
  size: 5,
  filter: {
    department: null,
    // field: null,
  },
  sort: {
    // -1 z -> a
    //  1 a ->
    createdAt: null,
  },
};

const initSort = [
  {
    icon: <Clock size={20} />,
    name: "createdAt",
    placeholder: "Thời gian đăng",
    data: [
      {
        key: "Gần đây nhất",
        value: 1,
      },
      {
        key: "Cũ nhất",
        value: -1,
      },
    ],
  },
];

export { initParams, initSort };
