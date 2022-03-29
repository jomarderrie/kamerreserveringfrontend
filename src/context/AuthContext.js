import React, { useContext, useState } from 'react'

export const AuthContext = React.createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState({})
    const [token, setToken] = useState('')

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}
