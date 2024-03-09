

import { createContext, useState } from 'react';
import useMyContext from '../../hooks/userMyContext';
import { useNavigate } from 'react-router';
import CounsellorMenu from './CounsellorMenu';
import AdminMenu from './AdminMenu';

export const StaffMenuContext = createContext()

const StaffMenu = () => {
    const navigate = useNavigate()

    const [select, setSelect] = useState('1')

    const { user } = useMyContext()

    const itemOnclick = (type) => {
        setSelect(type)
        navigate(type)
    }

    return <StaffMenuContext.Provider value={{ select, itemOnclick }}>
        <div className="w-full">
            <div className="bg-primary text-white text-[18px] text-center py-4 rounded-2xl shadow-md font-bold">
                <h1>Khoa Công nghệ thông tin</h1>
            </div>

            <div className="mt-2 bg-white rounded-2xl overflow-hidden border shadow-md">
                {
                    user.role === 'COUNSELLOR' &&
                    <CounsellorMenu />
                }
                {
                    user.role === 'ADMIN' &&
                    <AdminMenu />
                }

            </div>
        </div>
    </StaffMenuContext.Provider>
}

export default StaffMenu