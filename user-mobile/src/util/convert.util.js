function dateTimeToDate(dateTime) {
  let dateObject = new Date(dateTime);
  let day = dateObject.getDate();
  let month = dateObject.getMonth() + 1;
  let year = dateObject.getFullYear();
  return day + "/" + month + "/" + year;
}

export function convertDateTime(dateTimeStr) {
  let date = new Date(dateTimeStr);
  let hours = date.getUTCHours().toString().padStart(2, '0');
  let minutes = date.getUTCMinutes().toString().padStart(2, '0');
  let day = date.getUTCDate().toString().padStart(2, '0');
  let month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
  let year = date.getUTCFullYear();

  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

export function transformDepartments(departments) {
  const retDepartments = departments.map((department) => ({
    value: department.departmentName || "unknow Department",
    key: department._id,
  }));
  retDepartments.unshift({ key: "null", value: "Tất cả" });
  return retDepartments;
}

export function transformsFields(fields) {
  const retFields = fields.map((field) => ({
    value: field.fieldName,
    key: field._id,
  }));
  retFields.unshift({ key: "null", value: "Tất cả" });
  return retFields;
}

export const getRoleName = (role) => {
  const roleList = {
    USER: "Người dùng",
    COUNSELLOR: "Tư vấn viên",
    DEPARTMENT_HEAD: "Trưởng khoa",
    SUPERVISOR: "Giám sát viên",
    ADMIN: "Quản trị viên",
  };
  return roleList[role] || "Khách";
};

export { dateTimeToDate };
