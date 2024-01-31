import DepartmentListItems from "./DepartmentListItems"

const DepartmentList = () => {
    return <div className="bg-white rounded-2xl  pb-4 border shadow-md">
        <h1 className="pt-6 text-[18px] font-bold text-black/75 px-6">Khoa</h1>
        
        <DepartmentListItems isSelected={true}/>
        <DepartmentListItems />
        <DepartmentListItems />
        <DepartmentListItems />
        <DepartmentListItems />
        <DepartmentListItems />
        <DepartmentListItems />
        <DepartmentListItems />
        <DepartmentListItems />
        <DepartmentListItems />
        <DepartmentListItems />
        <DepartmentListItems />
        <DepartmentListItems />
        <DepartmentListItems />
    </div>
}

export default DepartmentList