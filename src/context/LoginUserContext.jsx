import axios from 'axios'
import {createContext, React, useContext, useEffect, useState} from 'react'

const LoggedInContext = createContext()

export const useLoggedInUser = () => useContext(LoggedInContext)

export function LoggedInProvider({children}){
    const [loggedInUser, setLoggedInUser] = useState({})

    useEffect(() => {
      const fetchedLogginUser = async() =>{
        try {
            const response = await axios.get('/api/v1/users/current-user')   
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

