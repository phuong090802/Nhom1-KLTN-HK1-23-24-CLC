import React, { useContext, useState } from "react";
import ModalLayout2 from "../../../template/modal-layout-2";
import { UserProfileContext } from "./UserProfileStore";
import { DataContext } from "../../../store";
import default_avatar from "../../../assets/image/default_avatar.png";
import MyFileInput from "../../../atom/my-file-input";
import MyButton from "../../../atom/my-button";
import { changeAvatarSv } from "../../../service/user/userProfile.sv";
import { toast } from "sonner";

export const UserAvatarModal = () => {
  const { hiddenAvatarModal, setHiddenAvatarModal } =
    useContext(UserProfileContext);

  const { user, setUser } = useContext(DataContext);

  const changeAvatar = async () => {
    try {
      const submitData = new FormData();
      submitData.append("file", file);
      const response = await changeAvatarSv(submitData);
      console.log(response);
      setUser((prev) => ({ ...prev, avatar: URL.createObjectURL(file) }));
      toast.success("Thay đổi avatar thành công");
      setFile(null);
      setHiddenAvatarModal(true);
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi thay đổi avatar");
    }
  };

  const [file, setFile] = useState(null);

  return (
    <ModalLayout2 hidden={hiddenAvatarModal} setHidden={setHiddenAvatarModal}>
      <div className="flex justify-center items-center p-4 border border-black50 mb-4 w-[24rem] h-[16rem]">
        <img
          src={
            !!file ? URL.createObjectURL(file) : user?.avatar || default_avatar
          }
          alt=""
          className="size-40"
        />
      </div>
      <MyFileInput
        value={file}
        onChange={(file) => setFile(file)}
        accept="image/png, image/gif, image/jpeg"
      />
      <MyButton
        onClick={changeAvatar}
        className="bg-primary mt-4"
        size={"fullWidth"}
      >
        Thay đổi avatar
      </MyButton>
    </ModalLayout2>
  );
};
