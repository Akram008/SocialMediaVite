import React, { useState } from 'react'
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
import axios from 'axios'
import Part1 from '../../components/SignUpFields/Part1'
import Part2 from '../../components/SignUpFields/Part2'
import Part3 from '../../components/SignUpFields/Part3'
import Part4 from '../../components/SignUpFields/Part4'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [stepCounter, setStepCounter] = useState(0)
  const [userDetails, setUserDetails] = useState({
    username: '', 
    firstName: '', 
    lastName: '', 
    email: '',
    profilePic: '', 
    password: '', 
    bio: ''
  })
  const [previewProfile, setPreviewProfile] = useState('')
  const [accountMade, setAccountMade] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setUserDetails({...userDetails, [e.target.name]: e.target.value})
  }

  const handleFileChange = (e)=> {
    setUserDetails({...userDetails, profilePic: e.target.files[0]})
    setPreviewProfile(URL.createObjectURL(e.target.files[0]))
  }

  const handleAccoundMade = (e) => {
    setAccountMade(false) 
    navigate('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(`${API_BASE}/api/v1/users/register`, userDetails, {
        headers: {"Content-Type": "multipart/form-data"}, withCredentials: true 
      })
      setAccountMade(true)

    } catch (error) {
      console.log(error)
    }
  }

  const increaseStepCounter = () => setStepCounter(stepCounter+1)

  const successPopup = () => {
    return (
      <div className='z-30 fixed left-0 top-0 flex items-center justify-center h-screen w-full bg-black/75 p-3'> 
        <div className='w-full flex flex-col items-center gap-3 rounded-xl bg-[#121212] p-5'>
          <p className='text-white font-bold '>Welcome to THE QUITE PAGE!</p>
          <button className='border-none bg-transparent text-emerald-600' onClick={handleAccoundMade}>Done</button>
        </div>
      </div>
    )
  }

  return (
    <div className='h-screen w-full bg-[#121212] p-15'>
        {accountMade && successPopup()}
        <h1 className='text-white text-3xl text-center mt-10'>Sign Up</h1>
        <form className='w-full mt-20' onSubmit={handleSubmit}>
          {stepCounter ===0 && <Part1 handleChange={handleChange} increaseStepCounter={increaseStepCounter} userDetails={userDetails}/>}
          {stepCounter ===1 && <Part2 handleChange={handleChange} increaseStepCounter={increaseStepCounter} userDetails={userDetails}/>}
          {stepCounter ===2 && <Part3 handleChange={handleChange} increaseStepCounter={increaseStepCounter} userDetails={userDetails}/>}
          {stepCounter ===3 && <Part4 handleChange={handleChange} handleFileChange={handleFileChange} userDetails={userDetails} previewProfile={previewProfile}/>}
        </form>
        
    </div>
  )
}

export default SignUp