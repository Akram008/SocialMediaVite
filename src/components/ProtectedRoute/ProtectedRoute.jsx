import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const token = Cookies.get('accessToken')

  return token!==undefined ? <Outlet/> : <Navigate to='/login' replace/> 
}

export default ProtectedRoute