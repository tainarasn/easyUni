import { createContext, useEffect, useState } from "react"
import React from "react"
import { User } from "../types/server/class/user"

interface UserContextValue {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

interface UserProviderProps {
    children: React.ReactNode
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export default UserContext

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        console.log(user)
    }, [user])
    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
