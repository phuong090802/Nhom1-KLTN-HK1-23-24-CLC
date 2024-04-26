import clsx from "clsx";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { HomeHeader } from "./HomeHeader";
import { UserMenu } from "./UserMenu";
import { DataContext } from "../../store";
import { darkModeCss } from "../../constance";

const UserLayout = () => {
  const { isLoggedIn, darkMode } = useContext(DataContext);

  return (
    <>
      <div className={clsx("grid grid-cols-4 gap-2", darkMode && darkModeCss)}>
        <div className={clsx("p-2 h-[93vh]")}>{isLoggedIn && <UserMenu />}</div>
        <div className="col-span-2 ">
          <Outlet />
        </div>
        <div className=""></div>
      </div>
    </>
  );
};

export default UserLayout;
