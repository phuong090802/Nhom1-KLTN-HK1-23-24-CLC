
import { useState } from 'react';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import './style.css'
import { useNavigate } from 'react-router';


const Register = () => {
    const navigate = useNavigate()

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

    return <div className="container">
        <div className="form-container">
            <div className='form-header'>
                Đăng ký
                <p>Chào mừng đến với trang tư vấn sinh viên trường Đại học Sư Phạm Kỹ Thuật TP.HCM HCMUTE!</p>
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


            <div className='form-footer'>
                <p>
                    <span className='text-primary'
                    onClick={()=> navigate('/dang-nhap')}
                    >
                        Đăng nhập
                    </span></p>
                <p>
                    <span className='text-primary'
                    onClick={()=> navigate('/dang-nhap')}
                    >
                        Quên mật khẩu
                    </span></p>
            </div>
        </div>
    </div >
}
export default Register