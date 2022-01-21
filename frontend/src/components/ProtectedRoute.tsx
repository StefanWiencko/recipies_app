import { Navigate, Outlet } from "react-router-dom";
export const ProtectedRoute = ({ redirectTo }: { redirectTo: string }) => {
  const jwt = localStorage.getItem("recipies_app_jwt");
  return jwt ? <Outlet /> : <Navigate to={redirectTo} />;
};
