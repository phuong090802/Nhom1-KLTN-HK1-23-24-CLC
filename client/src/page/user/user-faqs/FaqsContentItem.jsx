import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';

import user_avatar from '../../../assets/svg/user_avatar.svg'
import { useCallback } from 'react';


const FaqsContentItem = ({ id, selectedId, setSelectedId }) => {

    const open = useCallback(() => {
        if (id === selectedId)
            setSelectedId('')
        else
            setSelectedId(id)
    }, [setSelectedId, id, selectedId])

    return <div className='bg-white rounded-2xl py-4 mb-2 shadow-md duration-500'>
        <div className="flex justify-between items-center px-4 mb-2">
            <div>
                <h1 className="text-[18px] font-bold text-black/75">Phòng Tuyển sinh và CTSV chịu trách nhiệm cấp những loại giấy tờ nào cho SV?</h1>
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
                <div className='pt-2 border-t-2 duration-500'>
                    <div className='px-4 flex'>
                        <ReplyOutlinedIcon className='mr-2' />
                        <div className='text-black/75'>
                            <h1 className='font-bold text-[18px]'>
                                Câu trả lời
                            </h1>
                            <p>Phòng Tuyển sinh và CTSV chịu trách nhiệm cấp các loại giấy tờ & giải quyết các yêu cầu sau đây cho SV: Giấy chứng nhận SV (v/v bổ túc hồ sơ tạm hoãn nghĩa vụ quân sự, xin việc làm, xin đi học, xin tạm trú, đi xe buýt, vay tín dụng ưu đãi (mẫu số 01/TDSV), bổ túc hồ sơ địa phương,…); xác nhận sổ ưu đãi giáo dục, đào tạo; giải quyết yêu cầu của SV về tạm dừng học tập, xin học tiếp sau tạm dừng, xin thôi học, xin chuyển trường; giấy giới thiệu,…
                            </p>
                            <span className='flex items-center mt-1'>
                                <p className='text-[13px] text-black/50'>Phản hồi từ</p>
                                <img src={user_avatar} alt="" className='w-6 h-6 rounded-2xl border border-primary mx-1' />
                                <p className='text-[13px] text-black/50'>Trần Nhật Hào</p>
                            </span>
                        </div>
                    </div>
                </div>
            </>
        }
    </div>
}

export default FaqsContentItem