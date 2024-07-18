import ItemLayout from "../../../layout/item-layout";

export const Item = ({ fieldName, status, onStatus, onDelete }) => {
  return (
    <ItemLayout
      text={fieldName}
      onDelete={onDelete}
      status={status}
      onStatus={onStatus}
    />
  );
};
