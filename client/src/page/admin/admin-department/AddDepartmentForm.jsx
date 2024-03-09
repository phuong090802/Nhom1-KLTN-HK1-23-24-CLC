import { useState } from "react"
import LabelInput from "../../../atom/label-input"
import MyButton from "../../../atom/my-button"
import { addDepartmentSv } from "../../../service/admin/adminDepartment.sv"
import { toast } from "sonner"
import { initDepartmentData } from "./const"

const AddDepartmentForm = ({ reload }) => {

    const [departmentData, setDepartmentData] = useState(initDepartmentData)

    const handleChange = (e) => {
        setDepartmentData({ ...departmentData, [e.target.name]: e.target.value })
    }

    const submit = async () => {
        try {
            const response = await addDepartmentSv(departmentData)
            console.log(response);
            toast.success(response.message || 'Tạo khoa thành công')
            setDepartmentData(initDepartmentData)
            reload()
        } catch (error) {
            console.log(error);
            toast.error(error.message || 'Có lỗi xảy ra khi tạo khoa')
        }
    }
    return <form>
        <LabelInput
            name='departmentName'
            label='Tên khoa'
            value={departmentData.departmentName}
            onChange={handleChange} />
        <div className="w-full flex justify-end mt-4">
            <MyButton
                title='Thêm'
                size='medium'
                onClick={submit} />
        </div>
    </form>
}

export default AddDepartmentForm
