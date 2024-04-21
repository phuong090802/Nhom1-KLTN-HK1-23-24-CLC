import { useContext } from "react";
import { DataContext } from "../store";
import { Outlet } from "react-router-dom";

export const SupervisorRoute = () => {
  const { user } = useContext(DataContext);

  return user.role === "SUPERVISOR" ? <Outlet></Outlet> : <h1>403 forbiden</h1>;
};
