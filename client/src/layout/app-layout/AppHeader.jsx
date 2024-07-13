import clsx from "clsx";
import {
  Bell,
  CircleHelp,
  Home,
  Moon,
  Newspaper,
  Sun,
  Users,
} from "lucide-react";
import React, { useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import MyButton from "../../atom/my-button";
import { colors, darkModeCss, links } from "../../constance";
import { getMeSv } from "../../service/public/auth.sv";
import { DataContext } from "../../store";
import { ConversationsButton } from "./ConversationsButton";
import { NotiButton } from "./NotiButton";

export const AppHeader = () => {
  const { isLoggedIn, setIsLoggedIn, setUser, darkMode } =
    useContext(DataContext);

  const getMe = async () => {
    try {
      const response = await getMeSv();
      setUser(response.user);
      setIsLoggedIn(true);
    } catch (error) {}
  };

  useEffect(() => {
    if (!isLoggedIn) {
      getMe();
    }
  }, []);
  return (
    <div
      className={clsx(
        "border-b border-black10 grid grid-cols-3 px-4",
        darkMode ? darkModeCss : "bg-white "
      )}
    >
      <Logo />
      <HeaderNav />
      <NotiMessageArea />
    </div>
  );
};

// Header Logo
const Logo = () => {
  return (
    <div className="flex items-center gap-2 py-2">
      <img src={logo} alt="" className="w-10 h-10" />
      <div className="flex">
        <p className="text-2xl font-bold text-primary">HCM</p>
        <p className="text-2xl font-bold text-error">UTE</p>
      </div>
    </div>
  );
};

// Header Navigation
const HeaderNav = ({ darkMode }) => {
  const buttons = [
    { name: "home", path: "/" },
    { name: "faqs", path: "/thu-vien-cau-hoi" },
    { name: "counsellors", path: "/danh-sach-tu-van-vien" },
    { name: "news", path: "/tin-tuc" },
  ];
  return (
    <div className={clsx("grid grid-cols-4")}>
      {buttons.map((button) => (
        <NavButton key={button.path} name={button.name} path={button.path} />
      ))}
    </div>
  );
};

const NavButton = ({ name, path }) => {
  const { darkMode } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isSelected = location.pathname === path;
  const handleClick = () => {
    navigate(path);
  };
  const icon = useMemo(() => {
    const color = isSelected ? colors.primary : darkMode ? "#fff" : "#000";
    switch (name) {
      case "home":
        return <Home color={color} className="cursor-pointer duration-500" />;
      case "faqs":
        return (
          <CircleHelp color={color} className="cursor-pointer duration-500" />
        );
      case "counsellors":
        return <Users color={color} className="cursor-pointer duration-500" />;
      case "news":
        return (
          <Newspaper color={color} className="cursor-pointer duration-500" />
        );
      default:
        break;
    }
  }, [name, location, darkMode]);

  return (
    <div
      className={clsx(
        "flex justify-center items-center border-primary hover:bg-primary/15",
        isSelected && "border-b-[3px]"
      )}
      onClick={handleClick}
    >
      {icon}
    </div>
  );
};

// Noti & Message Area
const NotiMessageArea = () => {
  const navigate = useNavigate();

  const { user, isLoggedIn, darkMode, setDarkMode } = useContext(DataContext);

  const NotiMessageAreaComponent = useMemo(() => {
    return (
      <div className="flex items-center flex-row-reverse gap-2">
        {isLoggedIn ? (
          <>
            {user?.role === "SUPERVISOR" || user?.role === "ADMIN" ? (
              <></>
            ) : (
              <>
                <NotiButton />
                <ConversationsButton />
              </>
            )}
            {/* <div
              className={clsx(
                "w-10 h-10 flex justify-center items-center rounded-full bg-black10 cursor-pointer",
                darkMode && "bg-white/10"
              )}
            >
              <button
                onClick={() => {
                  console.log(darkMode);
                  setDarkMode((prev) => !prev);
                }}
              >
                {darkMode ? <Sun /> : <Moon />}
              </button>
            </div> */}
          </>
        ) : (
          <div className="flex justify-end gap-2 items-center">
            <MyButton
              variant={"outline"}
              size={"default"}
              onClick={() => navigate(links.public.register)}
              className="border-2 border-primary"
            >
              Đăng ký
            </MyButton>
            <MyButton
              variant={"default"}
              size={"default"}
              className="bg-primary"
              onClick={() => navigate(links.public.login)}
            >
              Đăng Nhập
            </MyButton>
          </div>
        )}
      </div>
    );
  }, [isLoggedIn, darkMode, setDarkMode]);

  return NotiMessageAreaComponent;
};
