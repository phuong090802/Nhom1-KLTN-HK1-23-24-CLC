import { useContext } from "react";
import { DataContext } from "../store";
import { Outlet } from "react-router-dom";

export const CounsellorRoute = () => {
  const { user } = useContext(DataContext);

  return user.role === "COUNSELLOR" ? <Outlet></Outlet> : <h1>403 forbiden</h1>;
};
