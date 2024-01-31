import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import LoupeOutlinedIcon from '@mui/icons-material/LoupeOutlined';



const Item = () => {


    return <div className='bg-white rounded-2xl py-4 mb-2 shadow-md duration-500'>
        <div className="flex justify-between items-center px-4 mb-2">
            <div>
                <h1 className="text-[18px] font-bold text-black/75">Thắc mắc về nộp chứng chỉ Toeic để quy đổi điểm</h1>
                <p className="inline text-[10px] text-black/50 bg-[#EBEAEA] py-1 px-2 mr-1 rounded-lg">Khoa CNTT</p>
                <p className="inline text-[10px] text-black/50 bg-[#EBEAEA] py-1 px-2 mr-1 rounded-lg">Tư vấn chứng chỉ</p>
                <div className='flex gap-4 mt-2 text-black/75'>
                    <span className='flex items-center gap-2'>
                        <AccessTimeOutlinedIcon fontSize='small' />
                        <p className='text-[13px] text-black/50'>20:42 17/01/2024</p>
                    </span>
                    <span className='flex items-center gap-2'>
                        <RemoveRedEyeOutlinedIcon fontSize='small' />
                        <p className='text-[13px] text-black/50'>120 views</p>
                    </span>
                </div>
            </div>
            <div className='w-8 h-8 flex justify-center items-center bg-primary rounded-lg'>
                <LoupeOutlinedIcon className='text-white' />
            </div>
        </div>
    </div>
}

export default Item