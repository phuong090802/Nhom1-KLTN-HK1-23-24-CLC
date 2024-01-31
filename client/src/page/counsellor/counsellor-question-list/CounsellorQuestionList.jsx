import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';

import StaffMenu from "../../../components/staff-menu"
import Item from './Item';
import { useState } from 'react';

const CounsellorQuestionList = () => {

    const [selectedId, setSelectedId] = useState('')

    return <div className="grid grid-cols-5 mt-4 px-4 gap-4">
        <div className="">
            <StaffMenu />
        </div>
        <div className="col-span-4">
            <div className="bg-[#DAF8FF] py-2 px-8 text-[18px] font-bold rounded-2xl text-black/75 flex justify-between items-center shadow-md">
                Danh sách câu hỏi
                <FilterListOutlinedIcon />
            </div>
            <div className='mt-4'>
                <Item id={1} selectedId={selectedId} setSelectedId={setSelectedId} />
                <Item id={1} selectedId={selectedId} setSelectedId={setSelectedId} />
                <Item id={1} selectedId={selectedId} setSelectedId={setSelectedId} />
                <Item id={1} selectedId={selectedId} setSelectedId={setSelectedId} />
                <Item id={1} selectedId={selectedId} setSelectedId={setSelectedId} />
                <Item id={1} selectedId={selectedId} setSelectedId={setSelectedId} />
                <Item id={1} selectedId={selectedId} setSelectedId={setSelectedId} />
                <Item id={1} selectedId={selectedId} setSelectedId={setSelectedId} />
            </div>
        </div>
    </div>
}

export default CounsellorQuestionList