import React, { useEffect, useState } from 'react'
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLoggedInUser } from '../../context/LoginUserContext';
import axios from 'axios';

const EditProfile = () => {
   const {loggedInUser} = useLoggedInUser()

   const [userDetails, setUserDetails] = useState({
    username: '', 
    firstName: '', 
    lastName: '', 
    email: '',
    bio: ''
   }) 
   const [profilePic, setProfilePic] = useState('')

   const [previewProfile, setPreviewProfile] = useState('')

   const handleChange = (e) => {
    setUserDetails({...userDetails, [e.target.name]: e.target.value})
   }

   const handleFileChange = (e) => {
    setProfilePic(e.target.files[0])
    setPreviewProfile(URL.createObjectURL(e.target.files[0]))
   }

   useEffect(()=>{
    setUserDetails({...userDetails,
        username: loggedInUser.username,
        firstName: loggedInUser.firstName, 
        lastName: loggedInUser.lastName, 
        email: loggedInUser.email, 
        bio: loggedInUser.bio, 
    })
    setPreviewProfile(loggedInUser.profilePic)
   },[loggedInUser])

   const handleSubmit = async(e) => {
    e.preventDefault()
    
    try {
        const res = await axios.patch(`${API_BASE}/api/v1/users/updateUser`, userDetails,{withCredentials: true})
        
        if(profilePic !== ''){
          const profilePicRes = await axios.patch(`${API_BASE}/api/v1/users/updateUserProfilePic`, {profilePic: profilePic}, {headers: {"Content-Type": "multipart/form-data"}, withCredentials: true}) 
        } 
    } catch (error) {
        console.log(error)
    }
   }

  return (
    <div className='min-h-screen w-full bg-[#121212] pb-5'>
        <div className='flex justify-start items-center p-5 w-full'>
            <Link to="/user-profile" className='text-white text-2xl'><FaArrowLeftLong/></Link>
        </div>
        <form className='w-full flex flex-col justify-center items-center gap-4 p-5' onSubmit={handleSubmit}>
          <div className='w-20 h-20 rounded-full bg-black flex justify-center relative items-center'>
            <img src={previewProfile} className='h-full rounded-full opacity-50' />
            <input type='file' onChange={handleFileChange} name='profilePic' className='absolute top-0 left-0 text-white opacity-0 w-full z-10'/> 
            <p className='w-full h-full absolute top-0 left-0 flex items-center justify-center text-2xl text-white'>+</p>
          </div>

          <input type='text' value={userDetails.username} name='username' onChange={handleChange} className='w-full py-2 px-3 mt-5 bg-transparent border-b-1 border-b-white text-white outline-none' placeholder='@username' />
          
          <input type='text' value={userDetails.firstName} name='firstName' onChange={handleChange} className='w-full py-2 px-3 mt-5 bg-transparent border-b-1 border-b-white text-white outline-none' placeholder='Firstname' />
          
          <input type='text' value={userDetails.lastName} name='lastName' onChange={handleChange} className='w-full py-2 px-3 mt-5 bg-transparent border-b-1 border-b-white text-white outline-none' placeholder='Lastname' />
          
          <input type='email' value={userDetails.email} name='email' onChange={handleChange} className='w-full py-2 px-3 mt-5 bg-transparent border-b-1 border-b-white text-white outline-none' placeholder='xyz@gmail.com' />

          <textarea name="bio" value={userDetails.bio} onChange={handleChange} id="bio" placeholder='Bio' rows={5} className='w-full py-2 mt-5 bg-transparent border-b-1 border-b-white text-white outline-none'></textarea>  

          <button className='self-end py-2 px-5 mt-5 rounded-4xl bg-transparent border-1 border-white text-white' type='submit'>Update</button>
        </form>
    </div>
  )
}

export default EditProfile