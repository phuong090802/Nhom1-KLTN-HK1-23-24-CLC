import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

import user_avatar from '../../../assets/svg/user_avatar.svg'
import { useCallback } from 'react';


const CounsellorListItem = ({ id, selectedId, setSelectedId }) => {

    const open = useCallback(() => {
        if (id === selectedId)
            setSelectedId('')
        else
            setSelectedId(id)
    }, [setSelectedId, id, selectedId])

    return <div className='bg-white rounded-2xl py-4 mb-2 shadow-md duration-500'>
        <div className="flex justify-between items-center px-4 mb-2">
            <div>
                <img src={user_avatar} alt="user avatar" className='w-14 h-14 rounded-2xl border border-primary inline-block' />
                <h1 className='inline-block ml-4 text-[18px] font-bold text-black/75'>Nguyễn Hữu Trung</h1>
            </div>
            <div className='w-8 h-8 flex justify-center items-center bg-primary rounded-lg'
                onClick={open}>
                {(id === selectedId) ?
                    <ArrowDropUpOutlinedIcon className='text-white' />
                    :
                    <ArrowDropDownOutlinedIcon className='text-white' />}
            </div>
        </div>


        {
            (id === selectedId) &&
            <>
                <div className='pt-2 border-t-2 duration-500 grid grid-cols-3 px-16 text-black/75'>
                    <div className='mt-4'>
                        <span>
                            <LocalPhoneOutlinedIcon />
                            <p className='inline-block ml-2 text-[16px] font-bold'>Số điện thoại:</p>
                        </span>
                    </div>
                    <div className='col-span-2 mt-4'>
                        <p className='inline-block ml-2 text-[16px] font-bold'>0123456789</p>
                    </div>
                    <div className='mt-4'>
                        <span>
                            <EmailOutlinedIcon />
                            <p className='inline-block ml-2 text-[16px] font-bold'>Email:</p>
                        </span>
                    </div>
                    <div className='col-span-2 mt-4'>
                        <p className='inline-block ml-2 text-[16px] font-bold'>0123456789@gmail.com</p>
                    </div>
                    <div className='mt-4'>
                        <span>
                            <SchoolOutlinedIcon />
                            <p className='inline-block ml-2 text-[16px] font-bold'>Đơn vị:</p>
                        </span>
                    </div>
                    <div className='col-span-2 mt-4'>
                        <p className='inline-block ml-2 text-[16px] font-bold'>Phòng Tuyển sinh và Công Tác Sinh Viên - Chế độ chính sách</p>
                    </div>
                    <div className='mt-4'>
                        <span>
                            <BadgeOutlinedIcon />
                            <p className='inline-block ml-2 text-[16px] font-bold'>Chức vụ:</p>
                        </span>
                    </div>
                    <div className='col-span-2 mt-4'>
                        <p className='inline-block ml-2 text-[16px] font-bold'>Chức vụ</p>
                    </div>
                </div>
            </>
        }
    </div>
}

export default CounsellorListItem