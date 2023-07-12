import { useContext } from "react";
import { AccountContext } from "./AccountContext";
import { Navigate, Outlet } from "react-router";

const useAuth = () => {
  const { user } = useContext(AccountContext);
  return user && user.loggedIn;
};

const PrivateRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoutes;
