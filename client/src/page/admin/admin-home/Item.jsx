import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AccessibleForwardOutlinedIcon from '@mui/icons-material/AccessibleForwardOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';

import user_avater from '../../../assets/svg/user_avatar.svg'

const Item = ({ id, selected, setSelected }) => {

    const handleSelect = () => {
        if (selected === id) setSelected(-1)
        else setSelected(id)
    }

    return <div className="bg-white rounded-t-2xl pt-4 shadow-md mt-2 pb-4 rounded-b-2xl">
        <div className="flex justify-between items-center px-10">
            <div className=' flex justify-between items-center w-full'>
                <h1 className="text-[18px] font-bold text-black/75">Tên khoa</h1>
                <div className='flex gap-2'>
                    <button className="w-8 h-8 flex justify-center items-center bg-yellow-500 rounded-lg">
                        <EditOutlinedIcon className='text-white' />
                    </button>
                    <button className="w-8 h-8 flex justify-center items-center bg-red-500 rounded-lg">
                        <DeleteOutlineOutlinedIcon className='text-white' />
                    </button>
                    <button
                        className="w-8 h-8 flex justify-center items-center bg-primary rounded-lg"
                        onClick={handleSelect}>
                        <ArrowDropDownOutlinedIcon className='text-white' />
                    </button>
                </div>
            </div>
        </div>
        <div className={`overflow-hidden px-10 ${selected === id ? 'h-auto' : 'h-0'} animate-scale-in-ver-top` }>
            <div>
                <p className='text-black/75 flex items-center font-bold'>
                    <AccessibleForwardOutlinedIcon />
                    Trưởng khoa:
                </p>
                <div className='flex items-center gap-2 mt-2 ml-6'>
                    <img src={user_avater} alt="" className='w-8 h-8 rounded-lg border-2 border-primary' />
                    <p>Trần Hữu Trung</p>
                </div>
            </div>

            <div>
                <p className='text-black/75 flex items-center font-bold'>
                    <GroupsOutlinedIcon />
                    Nhân viên:
                </p>
                <div className='flex items-center justify-between py-1'>
                    <div className='flex items-center gap-2 mt-2 ml-6'>
                        <img src={user_avater} alt="" className='w-8 h-8 rounded-lg border-2 border-primary' />
                        <p>Trần Hữu Trung</p>
                    </div>
                    <button className="w-8 h-8 flex justify-center items-center bg-primary rounded-lg">
                        <KeyboardDoubleArrowUpOutlinedIcon className='text-white' />
                    </button>
                </div>
                <div className='flex items-center justify-between py-1'>
                    <div className='flex items-center gap-2 mt-2 ml-6'>
                        <img src={user_avater} alt="" className='w-8 h-8 rounded-lg border-2 border-primary' />
                        <p>Trần Hữu Trung</p>
                    </div>
                    <button className="w-8 h-8 flex justify-center items-center bg-primary rounded-lg">
                        <KeyboardDoubleArrowUpOutlinedIcon className='text-white' />
                    </button>
                </div>
                <div className='flex items-center justify-between py-1'>
                    <div className='flex items-center gap-2 mt-2 ml-6'>
                        <img src={user_avater} alt="" className='w-8 h-8 rounded-lg border-2 border-primary' />
                        <p>Trần Hữu Trung</p>
                    </div>
                    <button className="w-8 h-8 flex justify-center items-center bg-primary rounded-lg">
                        <KeyboardDoubleArrowUpOutlinedIcon className='text-white' />
                    </button>
                </div>
                <div className='flex items-center justify-between py-1'>
                    <div className='flex items-center gap-2 mt-2 ml-6'>
                        <img src={user_avater} alt="" className='w-8 h-8 rounded-lg border-2 border-primary' />
                        <p>Trần Hữu Trung</p>
                    </div>
                    <button className="w-8 h-8 flex justify-center items-center bg-primary rounded-lg">
                        <KeyboardDoubleArrowUpOutlinedIcon className='text-white' />
                    </button>
                </div>
                <div className='flex items-center justify-between py-1'>
                    <div className='flex items-center gap-2 mt-2 ml-6'>
                        <img src={user_avater} alt="" className='w-8 h-8 rounded-lg border-2 border-primary' />
                        <p>Trần Hữu Trung</p>
                    </div>
                    <button className="w-8 h-8 flex justify-center items-center bg-primary rounded-lg">
                        <KeyboardDoubleArrowUpOutlinedIcon className='text-white' />
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default Item