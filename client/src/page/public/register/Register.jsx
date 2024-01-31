import logo from '../../../assets/svg/big_logo.svg'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';


const Register = () => {
    return <div className="h-[95vh] bg-[#C4D1FF] flex justify-center items-center ">

        <div className="bg-white w-96 rounded-2xl flex flex-col justify-center items-center text-black/75 shadow-md">
            <img src={logo} alt="" className='mt-12 w-32' />

            <form action="" className='px-8 py-8 w-full'>
                <label htmlFor="phoneNumber "
                    className='text-[18px] font-semibold'>Số điện thoại</label>
                <div className='relative mb-6 mt-2'>
                    <input
                        type="tel"
                        name="phoneNumber" id=""
                        className='block outline-none border-b border-black w-full pl-8' placeholder='0123456789' />
                    <LocalPhoneOutlinedIcon className='absolute inset-y-0 start-0' />
                </div>

                <label htmlFor="password"
                    className='text-[18px] font-semibold '>Mật khẩu</label>
                <div className='relative mb-4 mt-2'>
                    <input
                        type="password"
                        name="password" id=""
                        className='block outline-none border-b border-black w-full pl-8' placeholder='xxxxxx' />
                    <HttpsOutlinedIcon className='absolute inset-y-0 start-0' />
                </div>

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

export default Register