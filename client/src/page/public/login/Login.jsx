import logo from '../../../assets/svg/big_logo.svg'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { useForm } from 'react-hook-form';
import { signIn } from '../../../service/guest/authorService';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router';


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

    return <div className="h-[95vh] bg-[#C4D1FF] flex justify-center items-center ">

        <div className="bg-white w-96 rounded-2xl flex flex-col justify-center items-center text-black/75 shadow-md">
            <div className='pt-8 pb-4 text-3xl font-bold font-title text-[#2E3192] self-start ml-8'>
                Đăng nhập
                <p className='text-xs font-medium text-black/50 w-3/4'>
                    Chào mừng trở lại! Vui lòng đăng nhập để sử dụng các chức năng tính năng của trang tư vấn
                </p>
            </div>

            <form
                className='px-8 pb-8 w-full'
                onSubmit={handleSubmit((data) => {
                    onSubmit(data)
                })}>
                <label htmlFor="username "
                    className='text-[18px] font-semibold'>Số điện thoại</label>
                <div className={`relative mt-2 ${!errors?.username && 'mb-6'}`}>
                    <input
                        {...register("username", {
                            required: 'Số điện thoại không được để trống'
                        })}
                        className='block outline-none border-b border-black w-full pl-8'
                        type="tel"
                        placeholder='0123456789' />
                    <LocalPhoneOutlinedIcon className='absolute inset-y-0 start-0' />
                </div>
                {errors?.username && <p className='text-xs text-red-500 my-1'>{errors.username.message}</p>}


                <label htmlFor="password"
                    className='text-[18px] font-semibold '>Mật khẩu</label>
                <div className={`relative mt-2 ${!errors?.password && 'mb-6'}`}>
                    <input
                        {...register("password", {
                            required: "Mật khẩu không được để trống"
                        })}
                        type='password'
                        className='block outline-none border-b border-black w-full pl-8'
                        placeholder='xxxxxx' />
                    <HttpsOutlinedIcon className='absolute inset-y-0 start-0' />
                </div>
                {errors?.password && <p className='text-xs text-red-500 my-1'>{errors.password.message}</p>}


                <button
                    type='submit'
                    className='w-full text-xl font-semibold text-white bg-primary rounded-lg py-2 mt-4'>
                    Đăng nhập
                </button>
            </form>

            <div className='flex justify-between w-full px-8 pb-8'>
                <p className='text-xs font-semibold'>
                    Chưa có tài khoản?
                    <span className='text-primary'>Đăng ký</span>
                </p>
                <p className='text-xs font-semibold'>
                    <span className='text-primary'>Quên mật khẩu</span>
                </p>
            </div>
        </div>
    </div>
}

export default Login