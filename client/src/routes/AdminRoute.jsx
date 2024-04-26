import { useContext } from "react";
import { DataContext } from "../store";
import { Outlet } from "react-router-dom";

export const AdminRoute = () => {
  const { user } = useContext(DataContext);

  return user.role === "ADMIN" ? <Outlet></Outlet> : <h1>403 forbiden</h1>;
};
