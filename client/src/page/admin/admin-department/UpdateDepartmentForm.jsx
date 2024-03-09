import { useContext, useEffect, useState } from "react"
import LabelInput from "../../../atom/label-input"
import MyButton from "../../../atom/my-button"
import { AdminDepartmentContext } from "./AdminDepartment"
import { updateDepartmentSv } from "../../../service/admin/adminDepartment.sv"
import { toast } from "sonner"

const UpdateDepartmentForm = () => {

    const { departments, interactDepId, getDepartments } = useContext(AdminDepartmentContext)

    const data = departments.find(dep => dep._id === interactDepId)

    const [tempData, setTempData] = useState({ departmentName: '' })

    useEffect(()=>{
        if (!data) return
        setTempData(prev => ({ ...prev, departmentName: data.departmentName }))
    }, [data])

    const handleChange = (e) => {
        setTempData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const submit = async () => {
        try {
            const response = await updateDepartmentSv(interactDepId, tempData)
            toast.success(response.message || 'Cập nhật thông tin thành công')
            getDepartments()
        } catch (error) {
            toast.error(error.message || 'Có lỗi xảy ra khi cập nhật thông tin')
            setTempData(prev => ({ ...prev, departmentName: data.departmentName }))
        }
    }

    return <>
        <LabelInput
            name={'departmentName'}
            label={'Tên khoa'}
            value={tempData.departmentName}
            onChange={e => handleChange(e)} />
        <div className="w-full flex justify-end mt-4">
            <MyButton
                size={'medium'}
                title={'Chỉnh sửa'}
                onClick={submit} />
        </div>
    </>
}

export default UpdateDepartmentForm