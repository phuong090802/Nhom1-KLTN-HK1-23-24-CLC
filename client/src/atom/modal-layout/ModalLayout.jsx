import { useContext } from "react"
import MaterialIcon from "../../components/material-icon"
import { DataContext } from "../../store/Store"
import { getRoleName } from "../../utils/user.util"

const ModalLayout = ({ title, handleClose, children, hidden }) => {

    const { user } = useContext(DataContext)

    return <div className={`${hidden && 'hidden'} fixed top-0 right-0 bottom-0 left-0 bg-black/20 z-50 flex justify-center items-center border border-black/10`}>
        <div className="bg-white p-8 rounded-2xl min-w-72">
            <div
                className="flex justify-between w-full flex-rows border-b pb-1 items-end ">
                <p className="text-sm text-gray-500">{getRoleName(user.role)}</p>
                <div
                    className=""
                    onClick={handleClose}>
                    <MaterialIcon
                        name={'CloseOutlinedIcon'}
                        style={'text-black/75 bg-black/10 rounded-full p-1 w-[30px] h-[30px] cursor-pointer hover:bg-black/25'} />
                </div>
            </div>
            <h1
                className="text-2xl text-primary font-bold">
                {title}
            </h1>
            {children}
        </div>
    </div>
}

export default ModalLayout