import { useEffect, useState } from "react";

import { getDepFieldsSv, getDepsSv } from "../services/guest/department.sv";
import { transformDepartments, transformsFields } from "../util/convert.util";

const useDepartmentField = () => {
  const [selectedDep, setSelectedDep] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [deps, setDeps] = useState([]);
  const [fields, setFields] = useState([]);

  const getDeps = async () => {
    try {
      const response = await getDepsSv();
      setDeps(transformDepartments(response.departments));
    } catch (error) {
      console.log("getDeps", error);
    }
  };

  const getFields = async () => {
    try {
      const response = await getDepFieldsSv(selectedDep);
      setFields(transformsFields(response.fields))
    } catch (error) {
      console.log("getFields", error);
    }
  };

  useEffect(() => {
    getDeps();
  }, []);

  useEffect(() => {
    if (selectedDep) {
      getFields();
    }
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
