import { useLocation, useNavigate } from "react-router-dom";
import { MenuIcon } from "./MenuIcon";

export const MenuItem = ({ icon, title, link }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      onClick={() => {
        navigate(link);
      }}
      className={`duration-300 py-[10px] pl-8 rounded-2xl flex flex-row items-center gap-4 text-md font-semibold cursor-pointer ${
        location.pathname === link ? "bg-primary text-white" : "hover:bg-primary/15"
      }`}
    >
      <MenuIcon
        name={icon}
        color={location.pathname === link ? "#fff" : "#000"}
      />
      {title}
    </div>
  );
};
