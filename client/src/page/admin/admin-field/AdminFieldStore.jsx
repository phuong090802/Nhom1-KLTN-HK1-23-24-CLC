import React, { createContext, useEffect, useState } from "react";
import { getGeneralFieldSv } from "../../../service/admin/adminField.sv";
import { initParams } from "./const";

export const AdminFieldContext = createContext({
  generalField: [],
  setGeneralFields: () => {},
  showingModal: Boolean,
  setShowingModal: () => {},
  getGeneralField: () => {},
  params: {},
  setParams: () => {},
  pages: Number,
});

export const AdminFieldStore = ({ children }) => {
  const [generalField, setGeneralFields] = useState([]);

  const [params, setParams] = useState(initParams);

  const [showingModal, setShowingModal] = useState([]);

  const [pages, setPages] = useState(0);

  const getGeneralField = async () => {
    try {
      const response = await getGeneralFieldSv(params);
      setGeneralFields(response.generalFields);
      setPages(response.pages);
    } catch (error) {}
  };

  useEffect(() => {
    getGeneralField();
  }, [params]);

  return (
    <AdminFieldContext.Provider
      value={{
        generalField,
        setGeneralFields,
        showingModal,
        setShowingModal,
        getGeneralField,
        params,
        setParams,
        pages,
      }}
    >
      {children}
    </AdminFieldContext.Provider>
  );
};
