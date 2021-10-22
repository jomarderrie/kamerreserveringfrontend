import React, {useContext,useState} from 'react'

export const KamersContext = React.createContext()


export default function KamerProvider({children}) {
    const [kamers,setKamers] = useState([]);
    return (
        <KamersContext.Provider value={{kamers,setKamers}}>
            {children}
        </KamersContext.Provider>
    )
}
