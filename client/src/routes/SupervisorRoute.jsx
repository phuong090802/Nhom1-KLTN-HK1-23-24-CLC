import { Outlet } from "react-router"
import useMyContext from "../hooks/userMyContext"

const SupervisorRoute = () => {
    const {user} = useMyContext()
    return (user.role && user.role === 'SUPERVISOR') ? <Outlet /> : <h1>403 Forbiden </h1>
}

export default SupervisorRoute