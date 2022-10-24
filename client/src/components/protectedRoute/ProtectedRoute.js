import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import UserContext from "../../context/productsContext/userContext/UserContext";

const ProtectedRoute = ({ children }) => {
    //userContext
    const userContext = useContext(UserContext);
    const { authenticated } = userContext;
    if(!authenticated){
        return <Navigate to={"/"} replace />
    }
    
    return <Outlet />
}

export default ProtectedRoute;