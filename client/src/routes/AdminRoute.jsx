import { Outlet } from "react-router"
import useMyContext from "../hooks/userMyContext"

const AdminRoute = () => {
    const { user } = useMyContext()
    return (user?.role && user.role === 'ADMIN') ? <Outlet /> : <h1>403 Forbiden </h1>
}

export default AdminRoute