import { useCallback } from "react"
import MaterialIcon from "../../components/material-icon"


const Page = ({ page, isSelected, setPage }) => {

    const style = {
        basic: 'w-8 h-8 flex justify-center items-center text-[18px] font-bold rounded-lg shadow-md'
        , selected: 'bg-primary text-white cursor-default'
        , notSelected: 'bg-white hover:bg-secondary duration-500 cursor-pointer'
    }

    const select = useCallback(() => {
        if (isSelected || !setPage) return
        setPage()
    }, [setPage])


    return <div
        className={`${isSelected ? style.selected : style.notSelected} ${style.basic}`}
        onClick={select}>
        {
            page === 'first' ?
                <MaterialIcon name={'FirstPageOutlinedIcon'} />
                : page === 'last' ?
                    <MaterialIcon name={'LastPageOutlinedIcon'} />
                    : page
        }
    </div>
}

export default Page