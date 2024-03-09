import { createContext, useContext, useEffect, useState } from "react"
import StaffTitleBar from "../../../components/staff-title-bar"
import Pagination from "../../../atom/pagination"
import { getDepartmentsSv } from "../../../service/admin/adminDepartment.sv"
import { toast } from "sonner"
import AddDepartmentModal from "./AddDepartmentModal"
import Item from "./Item"
import { sort, filter, initParams } from "./const"
import UpdateDepartmentModal from "./UpdateDepartmentModal"

export const AdminDepartmentContext = createContext()


const AdminDepartment = () => {

    const [selected, setSelected] = useState()

    const [showAdd, setShowAdd] = useState(false)

    const [showUpdate, setShowUpdate] = useState(false)

    const [params, setParams] = useState(initParams)

    const [pages, setPages] = useState()

    const [departments, setDepartments] = useState([])

    const [interactDepId, setInteractDepId] = useState('')

    const onPageChange = (page) => {
        setParams((prev) => ({ ...prev, page: page }))
    }

    const getDepartments = async () => {
        try {
            const response = await getDepartmentsSv(params)
            setDepartments(response.departments)
            setPages(response.pages)
        } catch (error) {
            console.log(error);
            toast.error('Lấy dữ liệu không thành công')
        }
    }

    useEffect(() => {
        getDepartments()
    }, [params])

    return <AdminDepartmentContext.Provider value={{ departments, interactDepId, getDepartments }}>

        <AddDepartmentModal
            handleClose={() => setShowAdd(false)}
            reload={getDepartments}
            hidden={!showAdd} />

        <UpdateDepartmentModal
            handleClose={() => setShowUpdate(false)}
            hidden={!showUpdate} />

        <StaffTitleBar
            title={'Quản lý khoa'}
            handleAddButton={() => setShowAdd(true)}
            sort={sort}
            filter={filter}
            setParams={setParams}
        />
        {
            departments.map((department) => {
                return <Item
                    key={department._id}
                    id={department._id}
                    isSelected={selected === department._id}
                    setSelected={setSelected}
                    handleUpdate={() => {
                        setShowUpdate(true);
                        setInteractDepId(department._id)
                    }} />
            })
        }
        <Pagination
            page={params.page}
            pages={pages}
            setPage={onPageChange} />

    </AdminDepartmentContext.Provider>
}

export default AdminDepartment