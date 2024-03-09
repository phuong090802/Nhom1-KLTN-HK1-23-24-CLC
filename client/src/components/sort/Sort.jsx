import { useState } from "react"
import MaterialIcon from "../material-icon"
import FilterItem from "./FilterItem"
import SortItem from "./SortItem"
import MyButton from "../../atom/my-button/MyButton"

const Sort = ({ filterData, sortData, setParams }) => {

    const [isOpen, setIsOpen] = useState(false)

    const [sortObject, setSortObject] = useState({
        fullName: 1,
        role: 1,
    })
    const [filterObject, setFilterObject] = useState({})

    const submit = () => {
        setParams(prev => (
            { ...prev, filter: filterObject, sort: sortObject, page: 1 }
        ))
    }

    // const [filter, setFilter] = useState([
    //     {
    //         label: { key: 'Chức vụ', value: 'role' },
    //         data: [
    //             { key: 'Người dùng', value: 'USER' },
    //             { key: 'Tư vấn viên', value: 'COUNSELLOR' },
    //             { key: 'Trưởng khoa', value: 'DEPARTMENT_HEAD' },
    //             { key: 'Giám sát viên', value: 'SUPERVISOR' }]
    //     },
    //     {
    //         label: { key: 'Trạng thái', value: 'isActive' },
    //         data: [
    //             { key: 'Hoạt động', value: true },
    //             { key: 'Không hoạt động', value: false }
    //         ]
    //     }
    //     ,
    //     ...
    // ])

    // const [sort, setSort] = useState([
    //     {
    //         sortBy: 'fullName',
    //         key: 'Học & Tên',
    //         sortType: [
    //             { key: 'Tăng dần', value: 1 },
    //             { key: 'Giảm dần', value: -1 }
    //         ]
    //     },
    //     ...
    // ])

    return <div className="relative">
        <span className="cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}>
            <MaterialIcon
                name={'FilterListOutlinedIcon'} />
        </span>
        <div className={`${isOpen ? '' : 'hidden'} absolute -right-[14px] bg-white p-4 border-[0.5px] border-black/10 rounded-lg text-black/75 mt-2`}>
            <span className="absolute border-[8px] border-transparent border-b-white -top-4 right-4 z-[999]" />
            <h1 className="text-lg">Lọc</h1>
            {filterData &&
                filterData.map((item, index) => {
                    return <FilterItem
                        label={item.label}
                        data={item.data}
                        onChange={setFilterObject}
                        key={index} />
                })
            }
            <h1 className="border-t text-lg mt-2">Sắp xếp</h1>
            {sortData &&
                sortData.map((item, index) => {
                    return <SortItem
                        key={index}
                        data={item}
                        onChange={setSortObject}
                    />
                })
            }
            <div className="w-full flex justify-end mt-2 ">
                <MyButton
                    size={'small'}
                    title={'Lọc kết quả'}
                    onClick={submit} />
            </div>
        </div>
    </div>
}

export default Sort