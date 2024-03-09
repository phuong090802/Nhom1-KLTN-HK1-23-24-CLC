import { useState } from "react"
import StaffTitleBar from "../../../components/staff-title-bar/StaffTitleBar"
import Item from "./Item"

const AdminHome = () => {
    const [selected, setSelected] = useState(-1)

    const ItemList = [1, 2, 3, 4, 5]
    return <>
        <StaffTitleBar title={'Quản lý khoa'} />
        {
            ItemList.map((id) => {
                return <Item key={id} id={id} selected={selected} setSelected={setSelected} />
            })
        }
    </>
}

export default AdminHome