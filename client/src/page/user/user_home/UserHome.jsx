import DepartmentList from "../../../components/department_list"
import NewsList from "../../../components/news_list"
import HomeContent from "./HomeContent"

const UserHome = () => {
    return <div className="mt-4 px-16 grid grid-cols-4 gap-4">
        <div className="">
            <NewsList />
        </div>
        <div className="col-span-2">
            <HomeContent />
        </div>
        <div className="">
            <DepartmentList />
        </div>
    </div>
}

export default UserHome