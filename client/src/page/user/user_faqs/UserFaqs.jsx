import DepartmentList from "../../../components/department_list"
import NewsList from "../../../components/news_list"
import FaqsContent from "./FaqsContent"

const UserFaqs = () => {
    return <div className="mt-4 px-16 grid grid-cols-4 gap-4">
        <div className="">
            <NewsList />
        </div>
        <div className="col-span-2">
            <FaqsContent />
        </div>
        <div className="">
            <DepartmentList />
        </div>
    </div>
}


export default UserFaqs