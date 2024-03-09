import { useCallback, useContext } from "react"
import MaterialIcon from "../../components/material-icon"
import { StaffMenuContext } from "./StaffMenu"

const CounsellorMenu = () => {

    const { select, itemOnclick } = useContext(StaffMenuContext)

    return <>
        <div
            onClick={() => itemOnclick('1')}
            className={`duration-300 py-2 pl-8 rounded-2xl ${(select === '1') ? 'bg-primary text-white' : ''}`}>
            <MaterialIcon
                name='DashboardOutlinedIcon'
                style={'mr-4'} />
            Dashboard
        </div>
        <div
            onClick={() => itemOnclick('2')}
            className={`duration-300 py-2 pl-8 rounded-2xl ${(select === '2') ? 'bg-primary text-white' : ''}`}>
            <MaterialIcon
                name='HelpCenterOutlinedIcon'
                className='mr-4' />
            Danh sách câu hỏi chờ
        </div>
        <div
            onClick={() => itemOnclick('3')}
            className={`duration-300 py-2 pl-8 rounded-2xl ${(select === '3') ? 'bg-primary text-white' : ''}`}>
            <MaterialIcon
                name='QuickreplyOutlinedIcon'
                className='mr-4' />
            Phản hồi từ trưởng khoa
        </div>
    </>
}

export default CounsellorMenu