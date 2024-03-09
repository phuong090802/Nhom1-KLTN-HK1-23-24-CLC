import StaffMenu from "../../../molecule/staff-menu"
import Dashboard from "./Dashboard"

const CounsellorHome = () => {
    return <div className="grid grid-cols-5 mt-4 px-4 gap-4">
        <div className="">
            <StaffMenu />
        </div>
        <div className="col-span-4">
            <Dashboard />
        </div>
    </div>
}

export default CounsellorHome