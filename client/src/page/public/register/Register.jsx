
import { useState } from 'react';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';


const Register = () => {

    const [step, setStep] = useState(1)

    const initRegisterData = {
        fullName: '',
        email: '',
        occupation: 'Sinh viên',

        phoneNumber: '',
        password: '',
        confirmPassword: '',
    }

    const [registerData, setRegisterData] = useState(initRegisterData)

    return <div className="h-[95vh] bg-[#C4D1FF] flex justify-center items-center ">
        <div className="bg-white w-96 rounded-2xl flex flex-col justify-center items-center text-black/75 shadow-md">
            <div className='pt-8 pb-4 text-3xl font-bold font-title text-[#2E3192] self-start ml-8'>
                Đăng ký
                <p className='text-xs font-medium text-black/50 w-3/4'>
                    Chào mừng đến với trang tư vấn sinh viên trường Đại học Sư Phạm Kỹ Thuật TP.HCM HCMUTE!
                </p>
            </div>
            {
                (step === 1) ?
                    <FormStep1
                        data={registerData}
                        setData={setRegisterData}
                        setStep={setStep} />
                    :
                    <FormStep2
                        data={registerData}
                        setData={setRegisterData}
                        setStep={setStep} />
            }


            <div className='flex justify-between w-full px-8 pb-8'>
                <p className='text-xs font-semibold cursor-pointer'>
                    <span className='text-primary'>Đăng nhập</span>
                </p>
                <p className='text-xs font-semibold cursor-pointer'>
                    <span className='text-primary'>Quên mật khẩu</span>
                </p>
            </div>
        </div>
    </div >
}
export default Register