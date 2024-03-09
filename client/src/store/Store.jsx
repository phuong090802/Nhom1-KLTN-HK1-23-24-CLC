import { createContext, useState } from "react"

export const DataContext = createContext()


const DataProvider = ({ children }) => {
    const [user, setUser] = useState({})

    return (
        <DataContext.Provider
            value={{
                user,
                setUser
            }}>
            {children}
        </DataContext.Provider>
    )
}


export default DataProvider