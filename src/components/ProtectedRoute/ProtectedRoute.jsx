import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const [accessGiven, setAccessGiven] = useState(true)
  const token = Cookies.get('accessToken')

  console.log(token)

  return accessGiven ? <Outlet/> : <Navigate to='/login' replace/> 
}

export default ProtectedRoute