import user_avatar from '../../../assets/svg/user_avatar.svg'
import Filter from '../../../components/filter'

import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { Suspense, lazy, useState } from 'react';
import LoadingComponent from '../../../components/loading-component';
import './style.css'

const HomeContentItem = lazy(() => import('./HomeContentItem'))

const HomeContent = () => {

    const [selectedId, setSelectedId] = useState('')

    const sampleId = [1, 2, 3, 4, 5, 6, 7, 8]

    return <>
        <div className='header-container'>
            <div className='header-content'>
                <img src={user_avatar} alt="Ảnh đại diện" />
                <p>Bạn có thắc mắc? Bạn gặp vấn đề !?</p>
            </div>
            <button>Đặt câu hỏi</button>
        </div>

        <div className='home-title'>
            <p>Hỏi đáp</p>
            <div>
                <FilterListOutlinedIcon className='mr-4' />
                <Filter />
            </div>
        </div>

        <div className='mt-2'>
            {
                sampleId.map((id, index) => {
                    return <Suspense key={index} fallback={<LoadingComponent />}>
                        < HomeContentItem key={id} id={id} selectedId={selectedId} setSelectedId={setSelectedId} />
                    </Suspense>
                })
            }
        </div>
    </>
}

export default HomeContent