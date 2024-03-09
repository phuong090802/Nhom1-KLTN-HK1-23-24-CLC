import user_avatar from '../../assets/svg/user_avatar.svg'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { toast } from 'sonner';
import useMyContext from '../../hooks/userMyContext';

const UserMenu = () => {

    const [open, setOpen] = useState(false)
    const { user, setUser } = useMyContext()

    const logout = async () => {
        try {
            toast.success('Đăng xuất thành công')
        } catch (error) {
            toast.error()
        } finally {
            setUser({})
            Cookies.remove('accessToken')
            setTimeout(() => {
                location.reload()
            }, 500)
        }
    }

    return <div className='flex items-center z-10'>
        <img src={user_avatar} className='w-12 h-12 rounded-lg border-2 border-black' />
        <div className='relative bg-slate-300 rounded-r-lg flex items-center justify-between h-8'>
            <p className='py-1 pr-8 pl-2 font-semibold text-white h-8 w-[170px]'>{user.fullName}</p>
            <span className='pr-2'
                onClick={() => setOpen(!open)}>
                <ArrowDropDownOutlinedIcon className='text-white cursor-pointer ' />
            </span>
            <div className={`${open ? 'h-auto pt-2' : 'h-0 pt-0'} absolute top-8 overflow-hidden animate-scale-in-ver-top duration-500  w-full `}>
                <ul className=' bg-slate-300 rounded-lg shadow-md relative  py-2'>
                    <span className='absolute right-4 -top-4 border-y-8 border-x-[6px] border-transparent border-b-slate-300'></span>
                    <li className='px-2 py-2 flex items-center gap-2 text-black/75 cursor-pointer hover:bg-slate-500 hover:text-white duration-500'>
                        <FolderSharedOutlinedIcon />
                        <span>Thông tin cá nhân</span>
                    </li>

                    <li className='px-2 py-2 flex items-center gap-2 text-black/75 cursor-pointer hover:bg-slate-500 hover:text-white duration-500'
                        onClick={logout}>
                        <LogoutOutlinedIcon />
                        <span>Đăng xuất</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}

export default UserMenu