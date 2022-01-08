import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { DataContext } from "./DataProvider";
export const ProtectedRoute = () => {
  const { data } = useContext(DataContext);
  return localStorage.getItem("recipies_app_jwt") && data ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" />
  );
};
