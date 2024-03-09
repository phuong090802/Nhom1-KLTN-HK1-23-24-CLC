import { createContext, useEffect, useState } from "react"
import { toast } from "sonner"

import StaffTitleBar from "../../../components/staff-title-bar"
import { getUsersSv } from "../../../service/admin/adminUser.sv"
import Pagination from "../../../atom/pagination"

import Item from "./Item"
import AddUserModal from "./AddUserModal"
import { sort, filter, initParams } from './const'

export const AdminUserContext = createContext()

const AdminUser = () => {


    const [params, setParams] = useState(initParams)
    const [pages, setPages] = useState(0)

    const [showAdd, setShowAdd] = useState(false)
    const [selected, setSelected] = useState(-1)

    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers();
    }, [params])

    const onPageChange = (page) => {
        setParams((prev) => ({ ...prev, page: page }))
    }

    const getUsers = async () => {
        try {
            const response = await getUsersSv(params)
            setPages(response.pages)
            setUsers(response.users)
        } catch (error) {
            console.log(error);
            toast.error('Lấy dữ liệu không thành công')
        }
    }

    return <>
        <AddUserModal
            onClose={() => setShowAdd(false)}
            reload={getUsers}
            hidden={!showAdd} />
        <StaffTitleBar
            title={'Quản lý người dùng'}
            handleAddButton={() => { setShowAdd(true) }}
            sort={sort}
            filter={filter}
            setParams={setParams} />
        {
            users.map((user) => {
                return <Item
                    key={user._id}
                    user={user}
                    isSelected={selected === user._id}
                    setSelected={setSelected} />
            })
        }
        <Pagination
            page={params.page}
            pages={pages}
            setPage={onPageChange} />
    </>
}

export default AdminUser