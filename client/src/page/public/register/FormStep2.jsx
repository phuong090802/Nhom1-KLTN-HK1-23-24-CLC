import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { signUp } from '../../../service/guest/authorService';


const FormStep2 = ({ data, setData, setStep }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onSubmit',
        defaultValues: data
    })

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

    return <form
        className='px-8 pb-8 w-full flex flex-col'
        onSubmit={handleSubmit((data) => {
            onSubmit(data)
        })}>
        <label htmlFor="phoneNumber"
            className='text-[18px] font-semibold '>Số điện thoại</label>
        <div className='relative mb-6 mt-2'>
            <input
                type="tel"
                {...register("phoneNumber", {
                    required: 'Số điện thoại không được để trống'
                })}
                name='phoneNumber'
                className='block outline-none border-b border-black w-full pl-8'
                placeholder='0123456789' />
            <LocalPhoneOutlinedIcon className='absolute inset-y-0 start-0' />
        </div>

        <label htmlFor="password "
            className='text-[18px] font-semibold'>Mật khẩu</label>
        <div className='relative mb-6 mt-2'>
            <input
                type="password"
                {...register("password")}
                name='password'
                className='block outline-none border-b border-black w-full pl-8'
                placeholder='xxxxxx' />
            <HttpsOutlinedIcon className='absolute inset-y-0 start-0' />
        </div>

        <label htmlFor="rePassword "
            className='text-[18px] font-semibold'>Xác nhận mật khẩu</label>
        <div className='relative mb-6 mt-2'>
            <input
                type="password"
                {...register("confirmPassword")}
                name='confirmPassword'
                className='block outline-none border-b border-black w-full pl-8'
                placeholder='xxxxxx' />
            <HttpsOutlinedIcon className='absolute inset-y-0 start-0' />
        </div>
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