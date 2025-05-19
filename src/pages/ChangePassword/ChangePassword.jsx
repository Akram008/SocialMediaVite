import React, { useState } from 'react'
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdDone } from "react-icons/md";
import axios from 'axios';


const ChangePassword = () => {
  const [loader, setLoader] = useState(false)  
  const [passDetails, setPassDetails] = useState({
    oldPassword: "", 
    newPassword: "", 
    confirmPassword: ""
  })  
  const [isChanged, setIsChanged] = useState(false)
  const [errorStatus, setErrorStatus] = useState(200)

  const navigate = useNavigate() 

  const handleSubmit = async (e) => {
    e.preventDefault() 
    try {
        setLoader(true)
        const passRes = await axios.patch(`${API_BASE}/api/v1/users/changePassword`, passDetails, {withCredentials: true}) 
        console.log(passRes)
        setErrorStatus(200) 
        setIsChanged(true)
        setPassDetails({
          oldPassword: "", 
          newPassword: "", 
          confirmPassword: ""
        })
    } catch (error) {
        console.log(error.status)
        setErrorStatus(error.status)
    }
    setLoader(false)
  }

  const handleChange = (e) => {
    setPassDetails({...passDetails, [e.target.name]: e.target.value})
  }

  const loaderContainer = () => (
    <div className='h-9/10 w-full flex items-center justify-center bg-[#121212]'>
        <div className='w-12 h-12 border-4 border-gray-500 border-t-transparent rounded-full animate-spin'></div>
    </div>
  )

  const successPopup = () => (
    <div className='fixed inset-0 top-0 left-0 flex items-center justify-center p-5 h-screen bg-black/75'>
      <div className='w-full bg-[#121212] flex flex-col items-center justify-center py-5'>
        <h1 className='text-6xl text-emerald-600 border-1 border-emerald-600 p-3 rounded-full mb-5'><MdDone/></h1>
        <p className='text-[#e0e0e0] mb-3'>Password Changed!</p> 
        <button className='text-[#121212] bg-emerald-600 px-3 py-1 rounded-2xl' onClick={()=>setIsChanged(false)}>Done</button>
      </div>
    </div>
  )

  const errorContainer = () => {
    switch (errorStatus) {
        case 404:
            return <p className='bg-red-100 text-red-700 border border-red-300 p-2 mt-6'>All fields are required!</p>
        case 403: 
            return <p className='bg-red-100 text-red-700 border border-red-300 p-2 mt-6'>Old password is incorrect!</p>
        case 422:
            return <p className='bg-red-100 text-red-700 border border-red-300 p-2 mt-6'>New and Confirm passwords are not same!</p>
        default:
            return <p className='bg-red-100 text-red-700 border border-red-300 p-2 mt-6'>Something went Wrong!</p>
    }
    
}

  return (
    <div className='h-screen w-full bg-[#121212]'>
        <div className='flex justify-start items-center p-5 h-1/10'>
            <button className='text-white text-2xl' onClick={()=> navigate(-1)}><FaArrowLeftLong/></button>
        </div>
        {isChanged && successPopup()}
        {loader ? loaderContainer(): (
        <form className='p-8 flex flex-col h-9/10' onSubmit={handleSubmit}>
            <h1 className='text-3xl text-[#e0e0e0] font-bold mb-8'>Change Passsword</h1> 
            
            <label htmlFor='oldPassword' className='text-gray-500'>Old Password</label>
            <input type='password' className='w-full mt-1 py-2 px-3 border-none bg-[#dcdcdc] outline-none mb-5' id='oldPassword' value={passDetails.oldPassword} name='oldPassword' onChange={handleChange} placeholder='Old Password' /> 
            
            <label htmlFor='newPassword' className='text-gray-500'>New Password</label>
            <input type='password' className='w-full mt-1 py-2 px-3 border-none bg-[#dcdcdc] outline-none mb-5' id='newPassword' value={passDetails.newPassword} name='newPassword' onChange={handleChange} placeholder='New Password' /> 
            
            <label htmlFor='confirmPassword' className='text-gray-500'>Confirm Password</label>
            <input type='password' className='w-full mt-1 py-2 px-3 border-none bg-[#dcdcdc] outline-none' id='confirmPassword' value={passDetails.confirmPassword} name='confirmPassword' onChange={handleChange} placeholder='Confirm Password' /> 
            
            {errorStatus !== 200 ? errorContainer() : <p></p>}

            <button className='mt-auto self-end bg-[#e0e0e0] text-lg font-semibold text-[#121212] border-none rounded-4xl py-2 px-5' type='submit'>Change</button>
        </form>
        )}
    </div>
  )
}

export default ChangePassword