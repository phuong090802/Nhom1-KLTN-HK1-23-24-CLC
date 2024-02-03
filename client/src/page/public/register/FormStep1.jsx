import { useForm } from "react-hook-form"

import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useCallback } from "react";

const FormStep1 = ({ data, setData, setStep }) => {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors } } = useForm({
            mode: 'onBlur',
            defaultValues: data
        })

    const onSubmit = useCallback((submitData) => {
        setData({ ...data, ...submitData })
        setStep(2)
    }, [setData])

    console.log(errors);

    return <form
        className='px-8 pb-8 w-full flex flex-col'
        onSubmit={handleSubmit((data) => {
            onSubmit(data)
        })}>
        <label htmlFor="name"
            className='text-[18px] font-semibold '>Họ & Tên</label>
        <div className='relative mb-6 mt-2'>
            <input
                type="text"
                {...register("fullName", {
                    required: 'Tên không được để trống!!',
                })}
                name='fullName'
                className='block outline-none border-b border-black w-full pl-8'
                placeholder='Trần Văn A' />
            <PersonOutlineOutlinedIcon className='absolute inset-y-0 start-0' />
        </div>

        <label htmlFor="occupation "
            className='text-[18px] font-semibold'>Nghề nghiệp</label>
        <div className='relative mb-6 mt-2'>
            <select
                {...register("occupation")}
                className='block outline-none border-b border-black w-full pl-8 pb-1'
                id='occupation'>
                <option value={'Sinh viên'}>Sinh viên</option>
                <option value={'Cựu sinh viên'}>Cựu sinh viên</option>
                <option value={'Phụ huynh'}>Phụ huynh</option>
                <option value={'Khác'}>Khác</option>
            </select>
            <WorkOutlineOutlinedIcon className='absolute inset-y-0 start-0' />
        </div>

        <label
            htmlFor="email "
            className='text-[18px] font-semibold'>Email</label>
        <div className='relative mb-6 mt-2'>
            <input
                type="email"
                {...register("email", {
                    onBlur: e => {
                        if (e.target.value === '123') {
                            setError('email', {
                                type: 'validate', message: '123'
                            })
                        }
                    }
                })}
                name='email'
                className='block outline-none border-b border-black w-full pl-8'
                placeholder='example@hcmute.com' />
            <EmailOutlinedIcon className='absolute inset-y-0 start-0' />
        </div>
        <div className='grid grid-cols-2 gap-1 w-40 self-center mt-2'>
            <span className='border-[3px] border-blue-400'></span>
            <span className='border-[3px] duration-500'></span>
        </div>
        <button
            className='w-full text-xl font-semibold text-white bg-blue-400 rounded-lg py-2 mt-4'
        >
            Tiếp tục
        </button>
    </form>
}

export default FormStep1