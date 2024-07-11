import { Text } from "react-native";
import ItemLayout from "../../../component/molecule/item-layout/ItemLayout";
import blank_avatar from "../../../../assets/images/blank_avatar.jpg";
import { useContext } from "react";
import { AdminUserContext } from "./AdminUserProvider";

export const Item = ({ data }) => {
  const { updateUserStatus, setShowDetailUserModal, setSelectedUser } =
    useContext(AdminUserContext);
  const onStatus = () => {
    updateUserStatus(data._id, { isEnabled: !data.isEnabled });
  };

  const onDetail = () => {
    setShowDetailUserModal(true);
    setSelectedUser(data);
  };

  return (
    <ItemLayout
      status={data.isEnabled}
      text={data.fullName}
      onDetail={onDetail}
      onStatus={onStatus}
      image={data?.avatar !== null ? { uri: data.avatar } : blank_avatar}
    />
  );
};
