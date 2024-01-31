import DashboardItem from "./DashboardItem"

const Dashboard = () => {
    return <>
        <div className="grid grid-cols-4 gap-4">
            <DashboardItem type={'questions'} />
            <DashboardItem type={'answers'} />
            <DashboardItem type={'fields'} />
            <DashboardItem type={'forward'} />
        </div>
    </>
}

export default Dashboard