import axios from 'axios'
const API_BASE = import.meta.env.VITE_API_BASE_URL;
import {createContext, React, useContext, useEffect, useState} from 'react'

const LoggedInContext = createContext()

export const useLoggedInUser = () => useContext(LoggedInContext)

export function LoggedInProvider({children}){
    const [loggedInUser, setLoggedInUser] = useState({})

    useEffect(() => {
      const fetchedLogginUser = async() =>{
        try {
            const response = await axios.get(`${API_BASE}/api/v1/users/current-user`, {withCredentials: true})   
            setLoggedInUser(response.data.data)
        } catch (error) {
            console.log(error)
        }
      }

      fetchedLogginUser()
    }, [])
    
    return(
        <LoggedInContext.Provider value={{loggedInUser}}>
            {children}
        </LoggedInContext.Provider>
    )
} 

