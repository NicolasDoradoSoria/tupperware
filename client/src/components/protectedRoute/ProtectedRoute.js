import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({isAllowed}) => {
    
    if(!isAllowed){
        return <Navigate to={"/"} />
    }
    
    return <Outlet />
}

export default ProtectedRoute;