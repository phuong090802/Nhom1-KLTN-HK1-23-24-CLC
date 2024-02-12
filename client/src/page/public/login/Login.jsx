import logo from '../../../assets/svg/big_logo.svg'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { useForm } from 'react-hook-form';
import { signIn } from '../../../service/guest/authorService';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router';
import './style.css'


const Login = () => {

    const naviagte = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            username: '',
            password: ''
        }
    })

    const onSubmit = async (data) => {
        try {
            const response = await signIn(data)
            Cookies.set('isLoggedIn', true)
            for (const [key, value] of Object.entries(response.user)) {
                Cookies.set(key, value)
            }
            naviagte('/')
        } catch (error) {
            console.log(error);
        }
    }

    return <div className="container">
        <div className="form-container">
            <div className='form-header'>
                Đăng nhập
                <p>Chào mừng trở lại! Vui lòng đăng nhập để sử dụng các chức năng tính năng của trang tư vấn</p>
            </div>

            <form
                className='form-body'
                onSubmit={handleSubmit((data) => {
                    onSubmit(data)
                })}>
                <label htmlFor="username">Số điện thoại</label>
                <div className={`input-container ${!errors?.username && 'mb-6'}`}>
                    <input
                        {...register("username", {
                            required: 'Số điện thoại không được để trống'
                        })}
                        type="tel"
                        placeholder='0123456789' />
                    <LocalPhoneOutlinedIcon className='input-icon' />
                </div>
                {errors?.username && <p className='alert-message'>{errors.username.message}</p>}


                <label htmlFor="password">Mật khẩu</label>
                <div className={`input-container ${!errors?.password && 'mb-6'}`}>
                    <input
                        {...register("password", {
                            required: "Mật khẩu không được để trống"
                        })}
                        type='password'
                        placeholder='xxxxxx' />
                    <HttpsOutlinedIcon className='input-icon' />
                </div>
                {errors?.password && <p className='alert-message'>{errors.password.message}</p>}


                <button
                    type='submit'
                    className='login-btn bg-primary'>
                    Đăng nhập
                </button>
            </form>

            <div className='form-footer'>
                <p>Chưa có tài khoản? <span className='text-primary'>Đăng ký</span></p>
                <p><span className='text-primary'>Quên mật khẩu</span></p>
            </div>
        </div>
    </div>
}

export default Login