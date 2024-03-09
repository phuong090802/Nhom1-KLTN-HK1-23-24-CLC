import { useContext } from "react"
import { DataContext } from "../store/Store"

const useMyContext = () => {
    return useContext(DataContext)
}

export default useMyContext