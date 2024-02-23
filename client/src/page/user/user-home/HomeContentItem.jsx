import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';

import user_avatar from '../../../assets/svg/user_avatar.svg'
import { useCallback } from 'react';
import './style.css'


const HomeContentItem = ({ id, selectedId, setSelectedId }) => {

    const open = useCallback(() => {
        if (id === selectedId)
            setSelectedId('')
        else
            setSelectedId(id)
    }, [setSelectedId, id, selectedId])



    return <div className={`card-container`}>
        <div className="card-info">
            <div className='card-header'>
                <h1>Thắc mắc về nộp chứng chỉ Toeic để quy đổi điểm</h1>
                <p>Khoa CNTT</p>
                <p>Tư vấn chứng chỉ</p>
                <div>
                    <span className='flex items-center gap-2'>
                        <img src={user_avatar} alt="" className='w-6 h-6 rounded-2xl border border-primary' />
                        <p className='text-[13px] text-black/50'>Trần Nhật Hào</p>
                    </span>
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
            <div className='card-header-btn' onClick={open}>
                {(id === selectedId) ?
                    <ArrowDropUpOutlinedIcon className='text-white' />
                    :
                    <ArrowDropDownOutlinedIcon className='text-white' />}
            </div>
        </div>
        <div className={`dropdown-container animate-scale-in-ver-top  ${id === selectedId ? 'h-52' : 'h-0'}`}>
            <div className='pb-2 border-t-2 duration-500'>
                <div className='px-4 flex'>
                    <QuestionMarkOutlinedIcon className='mr-2' />
                    <div className='text-black/75'>
                        <h1 className='font-bold text-[18px]'>Câu hỏi</h1>
                        <p>Dạ cho em được hỏi, em có nộp chứng chỉ Toeic để quy đổi điểm và ở mục miễn thi AVDR em có quên tick vào. Vậy liệu có ảnh hưởng gì không ạ.
                            Nếu em muốn được miễn thi AVDR vậy em phải nộp lại đơn quy đổi điểm và tick vào ô miễn thi AVDR đúng không ạ.
                            Em xin cảm ơn
                        </p>
                    </div>
                </div>
            </div>

            <div className='pt-2 border-t-2'>
                <div className='px-4 flex'>
                    <ReplyOutlinedIcon className='mr-2' />
                    <div className='text-black/75'>
                        <h1 className='font-bold text-[18px]'>Câu trả lời</h1>
                        <p>Chào em,
                            Em liên hệ cô Hoa tại A1-202.
                            Thân.
                        </p>
                        <span className='flex items-center mt-1'>
                            <p className='text-[13px] text-black/50'>Phản hồi từ</p>
                            <img src={user_avatar} alt="" className='w-6 h-6 rounded-2xl border border-primary mx-1' />
                            <p className='text-[13px] text-black/50'>Trần Nhật Hào</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


export default HomeContentItem