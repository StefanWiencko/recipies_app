import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import { DataContext } from "./FetchDataProvider";
interface Props {
  redirectTo: string;
  children: JSX.Element;
}
export const ProtectedRoute: FC<Props> = ({ redirectTo, children }) => {
  const auth = useContext(DataContext);
  return auth ? children : <Navigate to={redirectTo} />;
};
