import { useContext } from "react"
import { StaffMenuContext } from "./StaffMenu"
import MaterialIcon from "../../components/material-icon"

const MenuItem = ({ link, icon, title }) => {
    const { select, itemOnclick } = useContext(StaffMenuContext)
    return <div
        onClick={() => itemOnclick(link)}
        className={`duration-300 py-2 pl-8 rounded-2xl ${(select === link) ? 'bg-primary text-white' : ''}`}>
        <MaterialIcon
            name={icon}
            style={'mr-4'}
            color={(select === link) ? '#fff' : '#000'} />
        {title}
    </div>
}

export default MenuItem