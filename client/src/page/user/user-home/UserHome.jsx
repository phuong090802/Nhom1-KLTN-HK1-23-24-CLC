import { Suspense, lazy } from "react"
import HomeContent from "./HomeContent"
import LoadingComponent from "../../../components/loading-component"

const NewsList = lazy(() => import('../../../components/news-list'))
const DepartmentList = lazy(() => import('../../../components/department-list'))

const UserHome = () => {
    return <div className="mt-4 px-16 grid grid-cols-4 gap-4">
        <div className="">
            <Suspense fallback={<LoadingComponent />}>
                <NewsList />
            </Suspense>
        </div>
        <div className="col-span-2">
            <HomeContent />
        </div>
        <div className="">
            <Suspense fallback={<LoadingComponent />}>
                <DepartmentList />
            </Suspense>
        </div>
    </div>
}

export default UserHome