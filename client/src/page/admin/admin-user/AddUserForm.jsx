import { useEffect, useMemo, useState } from "react"
import LabelInput from "../../../atom/label-input"
import LabelSelect from "../../../atom/label-select"
import MyButton from "../../../atom/my-button"
import { addUserSv } from "../../../service/admin/adminUser.sv"
import { toast } from "sonner"
import { initData, roleData, } from './const'
import { getDepsNameSv } from "../../../service/guest/common.sv"

const AddUserForm = ({ reload }) => {

    const [userData, setUserData] = useState(initData)

    const [depList, setDepList] = useState([]);

    const getDepartmentList = async () => {
        const deps = [{ key: 'Chọn khoa', value: '' }];
        try {
            const response = await getDepsNameSv();
            const temp = response.departments.map((department) => {
                return { key: department.departmentName, value: department._id };
            });
            setDepList([...deps, ...temp]);
        } catch (error) {
            toast.error(error.message);
            setDepList(deps);
        }
    };

    useEffect(() => {
        getDepartmentList();
    }, []);

    const handleChange = (e) => {
        console.log({ [e.target.name]: e.target.value });
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const submit = async () => {
        try {
            let submitData = userData
            if (userData.role === 'SUPERVISOR' || userData.departmentId === '') {
                const { departmentId, ...newData } = userData
                submitData = newData
            }
            const response = await addUserSv(submitData)
            toast.success(response.message || 'Tạo người dùng thành công')
            setUserData(initData)
            reload()
        } catch (error) {
            console.log(error);
            toast.error(error.message || 'Lỗi xảy ra khi tạo người dùng')
        }
    }

    return <form className="">
        <LabelSelect
            label='Chức vụ'
            data={roleData}
            name='role'
            onChange={handleChange}
            value={userData.role} />
        <LabelSelect
            label='Khoa'
            data={depList}
            name='departmentId'
            onChange={handleChange}
            value={userData.departmentId}
            disable={userData.role === 'SUPERVISOR'} />
        <LabelInput
            label='Tên'
            type='text'
            name='fullName'
            onChange={handleChange}
            value={userData.fullName} />
        <LabelInput
            label='Số điện thoại'
            type='tel'
            name='phoneNumber'
            onChange={handleChange}
            value={userData.phoneNumber} />
        <LabelInput
            label='Email'
            type='email'
            name='email'
            onChange={handleChange}
            value={userData.email} />
        <LabelInput
            label='Mật khẩu'
            type='password'
            name='password'
            onChange={handleChange}
            value={userData.password} />
        <LabelInput
            label='Xác nhận mật khẩu'
            type='password'
            name='confirmPassword'
            onChange={handleChange}
            value={userData.confirmPassword} />
        <div className="w-full flex justify-end mt-4">
            <MyButton
                size={'medium'}
                title={'Thêm'}
                onClick={submit} />
        </div>
    </form>
}

export default AddUserForm