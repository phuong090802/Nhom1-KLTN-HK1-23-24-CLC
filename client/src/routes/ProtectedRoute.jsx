import Cookies from "js-cookie"
import { Outlet } from "react-router";

const ProtectedRoute = () => {

    const isLoggedIn = Cookies.get("isLoggedIn") === "true";

    return isLoggedIn ? <Outlet /> : <h1>404 Error Not Found</h1>
}

export default ProtectedRoute