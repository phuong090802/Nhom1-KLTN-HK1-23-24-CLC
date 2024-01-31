import user_avatar from '../../../assets/svg/user_avatar.svg'
import Filter from '../../../components/filter'

import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import FaqsContentItem from './FaqsContentItem';
import { useState } from 'react';

const FaqsContent = () => {

    const [selectedId, setSelectedId] = useState('')

    return <>
        <div className='bg-white py-4 rounded-2xl flex items-center justify-between shadow-md'>
            <div className='flex items-center flex-1 mr-4'>
                <img src={user_avatar} alt="Ảnh đại diện" className='w-12 h-12 rounded-2xl border-2 border-primary ml-4 ' />
                <p className='ml-4 pl-4 bg-ghost-white h-10 flex items-center rounded-lg text-black/50 w-full'>
                    Bạn có thắc mắc? Bạn gặp vấn đề !?
                </p>
            </div>
            <button className='text-[18px] font-bold text-white h-10 bg-primary px-8 rounded-lg mr-4 outline-none'>
                Đặt câu hỏi
            </button>
        </div>

        <div className='py-2 pl-4 bg-white mt-4 rounded-2xl shadow-md flex items-center justify-between'>
            <p className='text-[18px] font-bold'>Thư viện câu hỏi</p>
            <div className='pr-4 flex items-center'>
                <FilterListOutlinedIcon className='mr-4' />
                <Filter />
            </div>
        </div>

        <div className='mt-4'>
            <FaqsContentItem id={1} selectedId={selectedId} setSelectedId={setSelectedId} />
            <FaqsContentItem id={2} selectedId={selectedId} setSelectedId={setSelectedId} />
            <FaqsContentItem id={3} selectedId={selectedId} setSelectedId={setSelectedId} />
            <FaqsContentItem id={4} selectedId={selectedId} setSelectedId={setSelectedId} />
            <FaqsContentItem id={5} selectedId={selectedId} setSelectedId={setSelectedId} />
            <FaqsContentItem id={6} selectedId={selectedId} setSelectedId={setSelectedId} />
            <FaqsContentItem id={7} selectedId={selectedId} setSelectedId={setSelectedId} />
        </div>
    </>
}

export default FaqsContent