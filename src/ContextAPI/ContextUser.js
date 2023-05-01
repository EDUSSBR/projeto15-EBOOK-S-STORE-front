import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) =>{
    const [config, setConfig] = useState(null)

    return (
        <UserContext.Provider value={{config, setConfig}}>{children}</UserContext.Provider>
    )
}