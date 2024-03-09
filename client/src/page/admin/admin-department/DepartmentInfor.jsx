import { toast } from "sonner"
import IconButton from "../../../atom/icon-button"
import { updateDepStatusSv } from "../../../service/admin/adminDepartment.sv"
import { useContext } from "react"
import { AdminDepartmentContext } from "./AdminDepartment"

const DepartmentInfor = ({ data }) => {

    const { getDepartments } = useContext(AdminDepartmentContext)

    const isActive = data.isActive

    const updateStatus = async () => {
        try {
            const response = await updateDepStatusSv(data._id, { isActive: !isActive })
            console.log(response.message);
            toast.success(response.message)
            getDepartments()
        } catch (error) {
            toast.error(error.message)
        }
    }

    return <div className='flex w-full justify-between items-center border-t-2 py-2'>
        <p
            className='text-black/50 font-bold'>
            Trạng thái: <span className={`${isActive ? 'text-green-400' : 'text-red-400'} duration-500`}>
                {isActive ? 'Hoạt động' : 'Không hoạt động'}
            </span>
        </p>
        <IconButton
            icon={isActive ? 'LockOpenOutlinedIcon' : 'LockOutlinedIcon'}
            buttonColor={isActive ? '#4ade80' : '#ef4444'}
            iconColor='#fff'
            onClick={updateStatus} />
    </div>
}

export default DepartmentInfor