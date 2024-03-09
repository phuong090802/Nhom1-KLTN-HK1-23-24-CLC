import { useForm } from "react-hook-form"
import { useCallback, useState } from "react";
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import validator from "validator"

import { checkEmailExist } from "../../../socket/guest/authorSocket";
import useAuthorSocket from "../../../hooks/useAuthorSocket";
import { objIsEmpty } from "../../../utils/object";

import './style.css'

const FormStep1 = ({ data, setData, setStep }) => {

    useAuthorSocket()
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        getValues,
        formState: { errors } } = useForm({
            mode: 'onBlur',
            defaultValues: data
        })

    const onSubmit = useCallback((submitData) => {
        setData({ ...data, ...submitData })
        setStep(2)
    }, [setData])

    const onNext = useCallback(() => {
        if (!objIsEmpty(errors)) return

        const tempData = {
            fullName: getValues('fullName'),
            occupation: getValues('occupation'),
            email: getValues('email')
        }
        setData({
            ...data,
            ...tempData
        })
        setStep(2)
    })

    const validateEmail = async (email) => {
        if (email === '') {
            setError("emailValidate", { type: 'required', message: 'Email không thể để trống', });
        } else if (!validator.isEmail(email)) {
            setError("emailValidate", { type: 'validate', message: 'Email không hợp lệ', });
        } else {
            const code = await checkEmailExist(email);
            switch (code) {
                case 4004:
                    setError("emailValidate", { type: "validate", message: "Email đã được sử dụng", })
                    break;
                case 5000:
                    setError("emailValidate", { type: "validate", message: "Lỗi khi xác minh email", })
                    break;
                default:
                    clearErrors("emailValidate")
                    break;
            }
        }
    };

    return <form
        className="form-body"
        onSubmit={handleSubmit((data) => {
            onSubmit(data)
        })}>
        <label htmlFor="name">Họ & Tên</label>
        <div className={`input-container ${!errors?.fullName && 'mb-6'}`}>
            <input
                type="text"
                {...register("fullName", {
                    required: 'Tên không được để trống!!',
                })}
                name='fullName'
                placeholder='Trần Văn A' />
            <PersonOutlineOutlinedIcon className='input-icon' />
        </div>
        {errors?.fullName && <p className='alert-message'>{errors.fullName.message}</p>}

        <label htmlFor="occupation ">Nghề nghiệp</label>
        <div className={`input-container mb-6`}>
            <select
                {...register("occupation")}
                className={`pb-1`}
                id='occupation'>
                <option value={'Sinh viên'}>Sinh viên</option>
                <option value={'Cựu sinh viên'}>Cựu sinh viên</option>
                <option value={'Phụ huynh'}>Phụ huynh</option>
                <option value={'Khác'}>Khác</option>
            </select>
            <WorkOutlineOutlinedIcon className='input-icon' />
        </div>

        <label
            htmlFor="email ">Email</label>
        <div className={`input-container ${!errors?.emailValidate && 'mb-6'}`}>
            <input
                type="email"
                {...register("email", {
                    onBlur: e => {
                        validateEmail(e.target.value)
                    }
                })}
                placeholder='example@hcmute.com' />
            <EmailOutlinedIcon className='input-icon' />
        </div>
        {errors?.emailValidate && <p className='alert-message'>{errors.emailValidate.message}</p>}

        <div className='grid grid-cols-2 gap-1 w-40 self-center mt-2'>
            <span className='border-[3px] border-blue-400'></span>
            <span className='border-[3px] cursor-pointer'
                onClick={onNext}>
            </span>
        </div>
        <button className='submit-btn'>
            Tiếp tục
        </button>   
    </form>
}

export default FormStep1