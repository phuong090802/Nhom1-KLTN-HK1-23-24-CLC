import { Outlet } from "react-router"
import StaffMenu from "../../molecule/staff-menu"

const AdminLayout = () => {
    return <div className="grid grid-cols-5 mt-4 px-4 gap-4">
        <div className="">
            <StaffMenu />
        </div>
        <div className="col-span-4">
            <Outlet />
        </div>
    </div>
}

export default AdminLayout