import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const PublicRoute = () => {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;