import React, { useEffect, useState } from 'react'
const API_BASE = import.meta.env.VITE_API_BASE_URL
import Cookies from 'js-cookie'
import axios from 'axios'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const [loggedInUser, setLoggedInUser] = useState({})
  const [accessGiven, setAccessGiven] = useState(false)
  useEffect(()=>{
    try {
      const fetchAuthentication = async() => {
        const isAuthenticateRes = await axios.get(`${API_BASE}/api/v1/users/me`, {withCredentials: true})
        console.log(isAuthenticateRes.data)
        setLoggedInUser(isAuthenticateRes.data.user)
      }

      fetchAuthentication()
    } catch (error) {
      setLoggedInUser({})
    }
  },[])
  
  useEffect(()=>{
    setAccessGiven(prev=> !prev)
  },[loggedInUser])

  console.log(accessGiven)


  return accessGiven ? <Outlet/> : <Navigate to='/login' replace/> 
}

export default ProtectedRoute