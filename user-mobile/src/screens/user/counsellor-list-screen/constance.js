const initParams = {
  search: ["fullName", "email", "phoneNumber"],
  keyword: "",
  page: 1,
  size: 10,
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
    "counsellor.department": 1,
  },
};

export { initParams };
