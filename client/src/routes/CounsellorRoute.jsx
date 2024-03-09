import { Outlet } from "react-router"
import useUser from "../hooks/useUser"
import useMyContext from "../hooks/userMyContext"

const CounsellorRoute = () => {
    const {user} = useMyContext()
    return (user.role && user.role === 'COUNSELLOR') ? <Outlet /> : <h1>403 Forbiden </h1>
}

export default CounsellorRoute