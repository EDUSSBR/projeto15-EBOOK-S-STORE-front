import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) =>{
    const [config, setConfig] = useState(null)
    const [user, setUser] = useState({email:"", password:""})

    return (
        <UserContext.Provider value={{config, setConfig, user, setUser}}>{children}</UserContext.Provider>
    )
}