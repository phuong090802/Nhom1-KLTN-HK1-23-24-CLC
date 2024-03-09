import MaterialIcon from '../../../components/material-icon';
import IconButton from '../../../atom/icon-button';
import { useCallback, useContext, useEffect, useState } from 'react';
import StaffInforBox from './StaffInforBox';
import { AdminDepartmentContext } from './AdminDepartment';
import DepartmentInfor from './DepartmentInfor';
import { toast } from 'sonner';
import { getDepStaffsSv, setDepHeadSv } from '../../../service/admin/adminDepartment.sv';
import Sort from '../../../components/sort';
import Search from '../../../atom/search';
import Pagination from '../../../atom/pagination';
import { itemConst } from './const';

const Item = ({ id, isSelected, setSelected, handleUpdate }) => {

    const { departments } = useContext(AdminDepartmentContext)

    const data = departments.find(dep => dep._id === id)

    const [params, setParams] = useState(itemConst.initParams)

    const [pages, setPages] = useState(1)

    const [staff, setStaff] = useState({})

    const getDepStaffs = async () => {
        try {
            const response = await getDepStaffsSv(id, params)

            setPages(response.pages)
            const temp = response.counsellors
            let depHead, counsellors
            depHead = temp.find((staff) => staff.role === 'DEPARTMENT_HEAD')
            counsellors = temp.filter((staff) => staff.role === 'COUNSELLOR')

            setStaff({ depHead, counsellors })
        } catch (error) {
            toast.error(error.message)
        }
    }

    const onPageChange = (page) => {
        setParams((prev) => ({ ...prev, page: page }))
    }

    useEffect(() => {
        getDepStaffs()
    }, [])

    const setDepHead = async (staffId) => {
        if (!staffId) return
        try {
            const response = await setDepHeadSv({ departmentId: id, userId: staffId })
            toast.success(response.message)
            getDepStaffs()
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleSelect = useCallback(() => {
        if (isSelected) {
            setSelected(null);
        } else {
            setSelected(id)
        }
    })

    return <div className="bg-white rounded-t-2xl pt-4 shadow-md mt-2 pb-4 rounded-b-2xl">
        <div className="flex justify-between items-center px-10">
            <div className=' flex justify-between items-center w-full'>
                <h1 className="text-[18px] font-bold text-black/75">{data.departmentName}</h1>
                <div className='flex gap-2'>
                    <IconButton
                        buttonColor='#eab308'
                        iconColor='#fff'
                        icon='EditOutlinedIcon'
                        onClick={handleUpdate} />
                    <IconButton
                        iconColor='#fff'
                        icon='ArrowDropDownOutlinedIcon'
                        onClick={handleSelect} />
                </div>
            </div>
        </div>
        <div className={`overflow-hidden px-10 ${isSelected ? 'max-h-[600px]' : 'max-h-0'} duration-700`}>
            <div className='pt-2'>
                <DepartmentInfor data={data} />
                <p className='text-black/75 flex items-center font-bold'>
                    <MaterialIcon name='AccessibleForwardOutlinedIcon' style={'mr-1'} />
                    Trưởng khoa:
                </p>
                <StaffInforBox
                    isDepHead={true}
                    counsellor={staff.depHead} />
            </div>
            <div className='mt-2 border-t-2 pt-2'>
                <div className='flex justify-between items-center'>
                    <p className='text-black/75 flex items-center font-bold'>
                        <MaterialIcon name='GroupsOutlinedIcon' style={'mr-1'} />
                        Nhân viên:
                    </p>
                    <div className='flex items-center gap-4'>
                        <Sort />
                        <Search />
                    </div>
                </div>

                {(staff?.counsellors && staff.counsellors.length !== 0)
                    ?
                    staff.counsellors.map((counsellor) =>
                        <StaffInforBox
                            key={counsellor._id}
                            counsellor={counsellor}
                            setDepHead={() => setDepHead(counsellor._id)} />) :
                    <div className='w-full p-8 flex justify-center items-center text-lg font-bold'>Khoa chưa có nhân viên nào !!</div>}
                <Pagination
                    page={params.page}
                    pages={pages}
                    setPage={onPageChange} />
            </div>
        </div>
    </div>
}
export default Item