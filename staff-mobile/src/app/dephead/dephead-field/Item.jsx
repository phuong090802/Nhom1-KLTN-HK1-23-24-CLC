import React, { useContext } from "react";
import ItemLayout from "../../../component/molecule/item-layout/ItemLayout";
import { DepheadFieldContext } from "./DepheadFieldProvider";

export const Item = ({ data }) => {
  const { updateFieldStatus, setShowUpdateFieldModal, setSelectedField } =
    useContext(DepheadFieldContext);

  const onEdit = () => {
    setSelectedField(data);
    setShowUpdateFieldModal(true);
  };

  return (
    <ItemLayout
      text={data.fieldName}
      status={data.isActive}
      onStatus={() => updateFieldStatus(data._id, { isActive: !data.isActive })}
      onEdit={onEdit}
    />
  );
};
