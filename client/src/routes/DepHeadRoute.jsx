import { Outlet } from "react-router"
import useMyContext from "../hooks/userMyContext"

const DepHeadRoute = () => {
    const {user} = useMyContext()
    return (user.role && user.role === 'DEPARTMENT_HEAD') ? <Outlet /> : <h1>403 Forbiden </h1>
}

export default DepHeadRoute