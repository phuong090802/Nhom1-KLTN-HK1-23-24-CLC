import { Clock, Eye } from "lucide-react";

const initParams = {
  search: ["title", "content"],
  keyword: "",
  page: 1,
  size: 5,
  filter: {},
  sort: {
    views: null,
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
  {
    icon: <Eye size={20} />,
    placeholder: "Lượng người xem",
    name: "views",
    data: [
      {
        key: "Cao nhất",
        value: 1,
      },
      {
        key: "Thấp nhất",
        value: -1,
      },
    ],
  },
];

export { initParams, initSort };
