import user_avatar from '../../assets/svg/user_avatar.svg'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

const UserMenu = () => {
    return <div className='flex items-center'>
        <img src={user_avatar} className='w-10 h-10 rounded-lg border-2 border-primary' />
        <div className='bg-ghost-white rounded-r-lg flex items-center'>
            <p className='py-1 pr-6 pl-2 font-semibold text-black/75'>Trần Nhật Hào</p>
            <ArrowDropDownOutlinedIcon className='text-black/75'/>
        </div>
    </div>
}

export default UserMenu