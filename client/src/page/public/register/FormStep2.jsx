import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { signUp } from '../../../service/guest/authorService';
import { checkPhoneExist } from '../../../socket/guest/authorSocket';
import validator from "validator"
import useAuthorSocket from '../../../hooks/useAuthorSocket';



const FormStep2 = ({ data, setData, setStep }) => {


    useAuthorSocket()

    const { register, handleSubmit, setError, formState: { errors }, clearErrors, getValues } = useForm({
        mode: 'onBlur',
        defaultValues: data
    })
    console.log(errors);

    const onSubmit = useCallback(async (submitData) => {
        setData({ ...data, ...submitData })
        try {
            const response = await signUp({ ...data, ...submitData })
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }, [setData])

    const onBack = useCallback(() => {
        setStep(1);
    }, [setStep])

    const phoneValidate = async (phone) => {
        if (phone === '')
            setError("phoneValidate", { type: 'required', message: 'Số điện thoại không thể để trống', });
        else if (!validator.isMobilePhone(phone))
            setError("phoneValidate", { type: 'validate', message: 'Số điện thoại không hợp lệ', });
        else {
            const code = await checkPhoneExist(phone);
            switch (code) {
                case 4005:
                    setError("phoneValidate", { type: "validate", message: "Số điện thoại đã được sử dụng", })
                    break;
                case 5000:
                    setError("phoneValidate", { type: "validate", message: "Lỗi khi xác minh số điện thoại", })
                    break;
                default:
                    clearErrors("phoneValidate")
                    break;
            }
        }
    }

    const confirmPasswordValidate = (password) => {
        if (password !== getValues('password')) {
            setError('confirmPasswordValidate', { type: 'validate', message: 'Nhập lại mật khẩu không đúng' })
        } else {
            clearErrors('confirmPasswordValidate')
        }
    }

    return <form
        className='px-8 pb-8 w-full flex flex-col'
        onSubmit={handleSubmit((data) => {
            onSubmit(data)
        })}>
        <label htmlFor="phoneNumber"
            className='text-[18px] font-semibold '>Số điện thoại</label>
        <div className={`relative mt-2 ${!errors?.phoneValidate && 'mb-6'}`}>
            <input
                type="tel"
                {...register("phoneNumber", {
                    onBlur: e => phoneValidate(e.target.value)
                })}
                name='phoneNumber'
                className='block outline-none border-b border-black w-full pl-8'
                placeholder='0123456789' />
            <LocalPhoneOutlinedIcon className='absolute inset-y-0 start-0' />
        </div>
        {errors?.phoneValidate && <p className="text-xs text-red-500 my-1">{errors.phoneValidate.message}</p>}


        <label htmlFor="password "
            className='text-[18px] font-semibold'>Mật khẩu</label>
        <div className={`relative mt-2 ${!errors?.password && 'mb-6'}`}>
            <input
                type="password"
                {...register("password", {
                    required: 'Mật khẩu không được để trống',
                    minLength: {
                        value: 6,
                        message: 'Mật khẩu phải có ít nhất 6 ký tự'
                    }
                })}
                name='password'
                className='block outline-none border-b border-black w-full pl-8'
                placeholder='xxxxxx' />
            <HttpsOutlinedIcon className='absolute inset-y-0 start-0' />
        </div>
        {errors?.password && <p className="text-xs text-red-500 my-1">{errors.password.message}</p>}


        <label htmlFor="rePassword "
            className='text-[18px] font-semibold'>Xác nhận mật khẩu</label>
        <div className={`relative mt-2 ${!errors?.confirmPasswordValidate && 'mb-6'}`}>
            <input
                type="password"
                {...register("confirmPassword", {
                    onBlur: e => confirmPasswordValidate(e.target.value)
                })}
                name='confirmPassword'
                className='block outline-none border-b border-black w-full pl-8'
                placeholder='xxxxxx' />
            <HttpsOutlinedIcon className='absolute inset-y-0 start-0' />
        </div>
        {
            errors?.confirmPasswordValidate && <p className="text-xs text-red-500 my-1">
                {errors.confirmPasswordValidate.message}
            </p>
        }


        <div className='grid grid-cols-2 gap-1 w-40 self-center mt-2'>
            <span
                className='border-[3px] border-blue-400 cursor-pointer'
                onClick={onBack}>
            </span>
            <span className='border-[3px] border-blue-400'></span>
        </div>
        <button
            type='submit'
            className='w-full text-xl font-semibold text-white bg-primary rounded-lg py-2 mt-4'>                            Đăng ký
        </button>
    </form>
}

export default FormStep2