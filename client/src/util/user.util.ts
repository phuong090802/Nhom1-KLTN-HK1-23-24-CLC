const getRoleName = (role: string) => {
  switch (role) {
    case "USER":
      return "Người dùng";
    case "COUNSELLOR":
      return "Tư vấn viên";
    case "DEPARTMENT_HEAD":
      return "Trưởng khoa";
    case "SUPERVISOR":
      return "Giám sát viên";
    case "ADMIN":
      return "Quản trị viên";
    default:
      return "Khách";
  }
};

export { getRoleName };
