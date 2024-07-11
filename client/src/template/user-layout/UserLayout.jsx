import clsx from "clsx";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { DataContext } from "../../store";
import { UserMenu } from "./UserMenu";

const UserLayout = () => {
  const { isLoggedIn, darkMode } = useContext(DataContext);

  return (
    <>
      <div className={clsx("grid grid-cols-4 gap-2", darkMode && "bg-black")}>
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
