import logo from '../../assets/svg/logo_1.svg'
import HeaderButton from './HeaderButton'
import SearchBar from './SearchBar'
import UserMenu from './UserMenu'
import { useState } from 'react'

const Header = () => {

    const [selected, setSelected] = useState('home')

    return (
        <div className="flex justify-between items-center bg-white h-[60px] border-b border-black/10">
            <div className='ml-14'>
                <img className="" src={logo} alt="Logo HCMUTE" />
            </div>
            <div className='flex gap-4'>
                <HeaderButton icon={'home'} selected={selected} setSelected={setSelected} />
                <HeaderButton icon={'faqs'} selected={selected} setSelected={setSelected} />
                <HeaderButton icon={'counlist'} selected={selected} setSelected={setSelected} />
                <HeaderButton icon={'news'} selected={selected} setSelected={setSelected} />
            </div>
            <div className='flex gap-6 mr-14'>
                <SearchBar />
                <div className='flex gap-3'>
                    <HeaderButton icon={'message'} selected={selected} setSelected={setSelected} />
                    <HeaderButton icon={'noti'} selected={selected} setSelected={setSelected} />
                </div>
                <UserMenu />
            </div>
        </div>
    )
}

export default Header