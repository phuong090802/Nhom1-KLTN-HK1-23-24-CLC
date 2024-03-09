import MenuItem from "./MenuItem"

const DepheadMenu = () => {

    const itemList = [
        { link: '/admin/dashboard', icon: 'DashboardOutlinedIcon', title: 'Dashboard' },
        { link: '/admin/khoa', icon: 'HiveOutlinedIcon', title: 'Quản lý khoa' },
        { link: '/admin/nguoi-dung', icon: 'GroupOutlinedIcon', title: 'Quản lý người dùng' },
        { link: '/admin/tin-tuc', icon: 'FeedOutlinedIcon', title: 'Quản lý tin tức' },
    ]

    return <>
        {itemList.map((item) => <MenuItem link={item.link} icon={item.icon} title={item.title} />)}
    </>
}

export default DepheadMenu