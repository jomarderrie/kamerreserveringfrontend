import React, { useContext, useState } from 'react'

export const AuthContext = React.createContext()


export function AuthProvider({ children }) {
    const [user, setUser] = useState({})

 


    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
