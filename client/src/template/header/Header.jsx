import Cookies from 'js-cookie'
import logo from '../../assets/svg/logo_1.svg'
import HeaderButton from './HeaderButton'
import SearchBar from './SearchBar'
import UserMenu from './UserMenu'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { getMeSv } from '../../service/guest/authorService'
import useMyContext from '../../hooks/userMyContext'

const Header = () => {
    const navigate = useNavigate()

    const { user, setUser } = useMyContext()

    const [selected, setSelected] = useState('home')

    const locale = useLocation()


    useEffect(() => {
        const getMe = async () => {
            if (!Cookies.get('accessToken')) return
            try {
                const response = await getMeSv()
                setUser(response.user)
                return
            } catch (error) {
                console.log(error);
                return null
            }
        }
        getMe();
    }, [])


    return (
        <div className="flex justify-between items-center bg-white h-[60px] border-b border-black/10 relative">
            <div className='ml-14'>
                <img className="" src={logo} alt="Logo HCMUTE" />
            </div>
            <div className={`${(locale.pathname !== '/dang-nhap' && locale.pathname !== '/dang-ky')
                ? '' :
                'self-center translate-x-[25%] left-1/2'} flex gap-4`}>
                <HeaderButton
                    icon={'home'}
                    selected={selected}
                    setSelected={setSelected} />
                <HeaderButton
                    icon={'faqs'}
                    selected={selected}
                    setSelected={setSelected} />
                <HeaderButton
                    icon={'counlist'}
                    selected={selected}
                    setSelected={setSelected} />
                <HeaderButton
                    icon={'news'}
                    selected={selected}
                    setSelected={setSelected} />
            </div>
            <div className='flex gap-6 mr-14'>
                {(locale.pathname !== '/dang-nhap' && locale.pathname !== '/dang-ky') && <SearchBar />}
                {
                    user.role ?
                        <>
                            <div className='flex gap-3'>
                                <HeaderButton icon={'message'} selected={selected} setSelected={setSelected} />
                                <HeaderButton icon={'noti'} selected={selected} setSelected={setSelected} />
                            </div>
                            <UserMenu />
                        </>
                        :
                        <div className='gap-2 flex'>
                            <button className='h-10 px-4 bg-white text-primary border-2 text-[16px] font-bold rounded-lg border-primary'
                                onClick={() => {
                                    navigate('/dang-ky')
                                }}
                            >
                                Đăng ký
                            </button>
                            <button className='h-10 px-4 bg-primary text-white border-2 text-[16px] font-bold rounded-lg border-primary'
                                onClick={() => {
                                    navigate('/dang-nhap')
                                }}
                            >
                                Đăng nhập
                            </button>
                        </div>
                }
                <></>
            </div>
        </div>
    )
}

export default Header