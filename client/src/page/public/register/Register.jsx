import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

let renderCount = 0;

const Register = () => {

    renderCount++

    const { register, handleSubmit, formState: { errors } } = useForm()

    console.log(errors);

    const [step, setStep] = useState(1)

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        occupation: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });

    const handleDataChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    return <div className="h-[95vh] bg-[#C4D1FF] flex justify-center items-center ">
        <div className='fixed top-0 left-0 bg-slate-300 p-5'>
            Render Count: {renderCount}
        </div>
        <div className="bg-white w-96 rounded-2xl flex flex-col justify-center items-center text-black/75 shadow-md">
            <div className='pt-8 pb-4 text-3xl font-bold font-title text-[#2E3192] self-start ml-8'>
                Đăng ký
                <p className='text-xs font-medium text-black/50 w-3/4'>
                    Chào mừng đến với trang tư vấn sinh viên trường Đại học Sư Phạm Kỹ Thuật TP.HCM HCMUTE!
                </p>
            </div>


            <form
                className='px-8 pb-8 w-full flex flex-col'
                onSubmit={handleSubmit((data) => {
                })}>
                {
                    (step === 1) ?
                        <>
                            <label htmlFor="name"
                                className='text-[18px] font-semibold '>Họ & Tên</label>
                            <div className='relative mb-6 mt-2'>
                                <input
                                    type="text"
                                    {...register("fullName", {
                                        required: 'Tên không được để trống!!', minLength: {
                                            value: 4,
                                            message: 'Vui lòng nhập chính xác',
                                        }
                                    })}
                                    name='fullName'
                                    value={formData.fullName}
                                    onChange={(e) => handleDataChange(e)}
                                    className='block outline-none border-b border-black w-full pl-8'
                                    placeholder='Trần Văn A' />
                                <PersonOutlineOutlinedIcon className='absolute inset-y-0 start-0' />
                            </div>

                            <label htmlFor="occupation "
                                className='text-[18px] font-semibold'>Nghề nghiệp</label>
                            <div className='relative mb-6 mt-2'>
                                <select
                                    {...register("occupation")}
                                    name='occupation'
                                    value={formData.occupation}
                                    onChange={(e) => handleDataChange(e)}
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
                                    {...register("email")}
                                    name='email'
                                    value={formData.email}
                                    onChange={(e) => handleDataChange(e)}
                                    className='block outline-none border-b border-black w-full pl-8'
                                    placeholder='example@hcmute.com' />
                                <EmailOutlinedIcon className='absolute inset-y-0 start-0' />
                            </div>
                        </>
                        :
                        <>
                            <label htmlFor="phoneNumber"
                                className='text-[18px] font-semibold '>Số điện thoại</label>
                            <div className='relative mb-6 mt-2'>
                                <input
                                    type="tel"
                                    {...register("phoneNumber")}
                                    name='phoneNumber'
                                    value={formData.phoneNumber}
                                    onChange={(e) => handleDataChange(e)}
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
                                    value={formData.password}
                                    onChange={(e) => handleDataChange(e)}
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
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleDataChange(e)}
                                    className='block outline-none border-b border-black w-full pl-8'
                                    placeholder='xxxxxx' />
                                <HttpsOutlinedIcon className='absolute inset-y-0 start-0' />
                            </div>
                        </>
                }
                <div className='grid grid-cols-2 gap-1 w-40 self-center mt-2'>
                    <span className='border-[3px] border-blue-400 cursor-pointer' onClick={() => setStep(1)}></span>
                    <span className={`${(step === 2) ? 'border-blue-400' : ''} border-[3px] duration-500`}></span>
                </div>
                {
                    (step === 1) ?
                        <button
                            className='w-full text-xl font-semibold text-white bg-blue-400 rounded-lg py-2 mt-4'
                            onClick={(e) => {
                                e.preventDefault();
                                setStep(2)
                            }}>
                            Tiếp tục
                        </button>
                        :
                        <button
                            type='submit'
                            className='w-full text-xl font-semibold text-white bg-primary rounded-lg py-2 mt-4'>                            Đăng ký
                        </button>
                }
            </form>
            <div className='flex justify-between w-full px-8 pb-8'>
                <p className='text-xs font-semibold cursor-pointer'>
                    <span className='text-primary'>Đăng nhập</span>
                </p>
                <p className='text-xs font-semibold cursor-pointer'>
                    <span className='text-primary'>Quên mật khẩu</span>
                </p>
            </div>
        </div>
    </div>
}
export default Register