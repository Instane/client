import { Outlet, Navigate } from "react-router-dom"
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const ProtectedRoutes = () => {
    const { user } = useContext(AuthContext);
    
        return user ? <Outlet/> : <Navigate to="/" />
}

export default ProtectedRoutes;