import { useContext } from "react";
import { DataContext } from "../store";
import { Outlet } from "react-router-dom";

export const UserRoute = () => {
  const { user } = useContext(DataContext);

  return user.role ? <Outlet></Outlet> : <h1>403 forbiden</h1>;
};
