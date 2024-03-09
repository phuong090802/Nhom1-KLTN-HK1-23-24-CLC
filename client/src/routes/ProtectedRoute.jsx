import { Outlet } from "react-router";
import useUser from "../hooks/useUser";
import useMyContext from "../hooks/userMyContext";

const ProtectedRoute = () => {
    const {user} = useMyContext()
    return (user.role && user.role !== 'GUEST')
        ?
        <Outlet />
        :
        <h1>404 Error Not Found</h1>
}

export default ProtectedRoute