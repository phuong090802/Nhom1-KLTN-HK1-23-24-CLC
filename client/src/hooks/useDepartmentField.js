import { useEffect, useState } from "react";
import {
  getDepartmentsListSv,
  getFieldListSv,
} from "../service/public/department.sv";

const useDepartmentField = () => {
  const [selectedDep, setSelectedDep] = useState("");

  const [selectedField, setSelectedField] = useState("");

  const [deps, setDeps] = useState([]);

  const [fields, setFields] = useState([]);

  const getDeps = async () => {
    try {
      const response = await getDepartmentsListSv();
      const rawData = response.departments;
      const convertData = rawData.map((data) => {
        return {
          key: data.departmentName || "unknow department",
          value: data._id,
        };
      });
      setDeps([{ key: "Chọn khoa", value: "null" }, ...convertData]);
    } catch (error) {
      console.log(error);
    }
  };

  const getFields = async () => {
    try {
      const response = await getFieldListSv(selectedDep);
      const rawData = response.fields;
      const convertData = rawData.map((data) => {
        return {
          key: data.fieldName || "unknow field",
          value: data._id,
        };
      });
      setFields(convertData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDeps();
  }, []);

  useEffect(() => {
    if (selectedDep) getFields();
  }, [selectedDep]);

  return {
    selectedDep,
    setSelectedDep,
    selectedField,
    setSelectedField,
    deps,
    fields,
  };
};

export default useDepartmentField;
