import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import QuickreplyOutlinedIcon from '@mui/icons-material/QuickreplyOutlined';
import { useState } from 'react';

const StaffMenu = () => {

    const [select, setSelect] = useState('1')

    const itemOnclick = (type) => {
        setSelect(type)
    }

    return <div className="w-full">
        <div className="bg-primary text-white text-[18px] text-center py-4 rounded-2xl shadow-md font-bold">
            <h1>Khoa Công nghệ thông tin</h1>
        </div>

        <div className="mt-2 bg-white rounded-2xl overflow-hidden border shadow-md">
            <div
                onClick={() => itemOnclick('1')}
                className={`duration-300 py-2 pl-8 rounded-2xl ${(select === '1') ? 'bg-primary text-white' : ''}`}>
                <DashboardOutlinedIcon className='mr-4' />
                Dashboard
            </div>
            <div
                onClick={() => itemOnclick('2')}
                className={`duration-300 py-2 pl-8 rounded-2xl ${(select === '2') ? 'bg-primary text-white' : ''}`}>
                <HelpCenterOutlinedIcon className='mr-4' />
                Danh sách câu hỏi chờ
            </div>
            <div
                onClick={() => itemOnclick('3')}
                className={`duration-300 py-2 pl-8 rounded-2xl ${(select === '3') ? 'bg-primary text-white' : ''}`}>
                <QuickreplyOutlinedIcon className='mr-4' />
                Phản hồi từ trưởng khoa
            </div>
        </div>
    </div>
}

export default StaffMenu