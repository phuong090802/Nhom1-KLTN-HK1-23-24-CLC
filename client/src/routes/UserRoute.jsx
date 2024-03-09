import { Outlet } from "react-router"
import useMyContext from "../hooks/userMyContext"

const UserRoute = () => {
    const {user} = useMyContext()
    return (user?.role && user.role === 'USER') ? <Outlet /> : <h1>403 Forbiden </h1>
}

export default UserRoute