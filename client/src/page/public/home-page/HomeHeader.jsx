import React, { useContext } from "react";
import default_avatar from "../../../assets/image/default_avatar.png";
import MyButton from "../../../atom/my-button";
import { HomePageContext } from "./HomePageStore";
import { DataContext } from "../../../store";
import { toast } from "sonner";

export const HomeHeader = () => {
  const { setHiddenCreateQuestion } = useContext(HomePageContext);
  const { isLoggedIn, user } = useContext(DataContext);

  const handleCreateButtonClick = () => {
    if (!isLoggedIn) {
      toast.warning("Vui lòng đăng nhập để đặt câu hỏi !!");
    } else if (user.role !== "USER") {
      toast.warning("Chỉ có người dùng mới được đặt câu hỏi");
    } else {
      setHiddenCreateQuestion(false);
    }
  };

  return (
    <div className="px-4 py-4 rounded-xl shadow-black50 shadow-lg mt-2 border">
      <div className="flex w-full gap-2 items-center">
        <img
          src={default_avatar}
          alt="user_avatar"
          className="w-12 h-12 rounded-2xl border-2 border-primary"
        />
        <div className="px-4 py-2 bg-light_gray rounded-lg flex-1">
          <p className="text-black75">Bạn có thắc mắc!?</p>
        </div>
        <MyButton
          className="bg-primary hover:bg-primary/75"
          size={"md"}
          onClick={handleCreateButtonClick}
        >
          <p className="font-bold">Đặt câu hỏi</p>
        </MyButton>
      </div>
    </div>
  );
};
