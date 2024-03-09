import MaterialIcon from "../../components/material-icon"

const IconButton = ({ buttonColor, icon, iconColor, onClick, }) => {

    return <div
        className='w-8 h-8 flex justify-center items-center rounded-lg cursor-pointer duration-500'
        style={{ backgroundColor: `${buttonColor || '#2785DC'}` }}
        onClick={() => {
            if (!onClick) return
            onClick()
        }}>
        <MaterialIcon
            name={icon}
            color={iconColor}
        />
    </div>
}

export default IconButton