import user_avatar from '../../../assets/svg/user_avatar.svg'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { getRoleName } from '../../../utils/user.util';
import IconButton from '../../../atom/icon-button';

const Item = ({ user, isSelected, setSelected }) => {

    const handleDropdown = () => {
        if (isSelected) {
            setSelected(-1)
        } else {
            setSelected(user._id)
        }
    }

    return <div className="w-full bg-white mt-2 shadow-md rounded-2xl py-4 px-8">
        <div className='flex justify-between items-center mb-2'>
            <div className='flex items-center gap-2'>
                <img
                    src={user.avatar ? user.avatar : user_avatar}
                    alt="user avatar"
                    className='w-12 h-12 rounded-lg border-2 border-primary' />
                <p className='text-[18px] font-bold text-black/75'>{user.fullName}</p>
            </div>
            <IconButton
                icon={'ArrowDropDownOutlinedIcon'}
                iconColor={'#fff'}
                onClick={handleDropdown} />
        </div>
        <div>
            <div className={`${isSelected ? 'max-h-[300px]' : 'max-h-0'} duration-700 overflow-hidden`}>
                <div className='py-2 grid grid-cols-5  border-t-2'>
                    <span className='flex items-center'>
                        <LocalPhoneOutlinedIcon />
                        <p className='text-base font-semibold ml-1 text-black/75'>Số điện thoại:</p>
                    </span>
                    <span className='col-span-4'>
                        <p className='text-base font-semibold ml-1 text-black/75'>{user.phoneNumber}</p>
                    </span>
                </div>
                <div className='py-2 grid grid-cols-5'>
                    <span className='flex items-center'>
                        <EmailOutlinedIcon />
                        <p className='text-base font-semibold ml-1 text-black/75'>Email:</p>
                    </span>
                    <span className='col-span-4'>
                        <p className='text-base font-semibold ml-1 text-black/75'>{user.email}</p>
                    </span>
                </div>
                <div className='py-2 grid grid-cols-5'>
                    <span className='flex items-center'>
                        <BadgeOutlinedIcon />
                        <p className='text-base font-semibold ml-1 text-black/75'>Chức vụ:</p>
                    </span>
                    <span className='col-span-4'>
                        <p className='text-base font-semibold ml-1 text-black/75'>{getRoleName(user.role)}</p>
                    </span>
                </div>
                <div className='py-2 grid grid-cols-5'>
                    <span className='flex items-center'>
                        <RocketLaunchOutlinedIcon />
                        <p className='text-base font-semibold ml-1 text-black/75'>Trạng thái</p>
                    </span>
                    <span className='col-span-4 flex items-center gap-2'>
                        <p className='text-base font-semibold ml-1 text-black/75'>Khóa</p>
                        <div className='rounded-lg bg-primary'>
                            <LockOutlinedIcon className='text-white p-[2px]' />
                        </div>
                    </span>
                </div>
            </div>
        </div>
    </div>
}

export default Item