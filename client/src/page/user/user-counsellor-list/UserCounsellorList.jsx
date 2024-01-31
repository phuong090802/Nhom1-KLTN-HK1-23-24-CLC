import DepartmentList from "../../../components/department-list"
import NewsList from "../../../components/news-list"
import CounsellorListContent from "./CounsellorListContent"

const UserCounsellorList = () => {
    return <div className="mt-4 px-16 grid grid-cols-4 gap-4">
        <div className="">
            <NewsList />
        </div>
        <div className="col-span-2">
            <CounsellorListContent />
        </div>
        <div className="">
            <DepartmentList />
        </div>
    </div>
}


export default UserCounsellorList