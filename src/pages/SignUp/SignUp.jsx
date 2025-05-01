import React, { useState } from 'react'
const API_BASE = import.meta.env.VITE_API_BASE_URL;
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

  const navigate = useNavigate()

  const handleChange = (e) => {
    setUserDetails({...userDetails, [e.target.name]: e.target.value})
  }

  const handleFileChange = (e)=> {
    setUserDetails({...userDetails, profilePic: e.target.files[0]})
    setPreviewProfile(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(`${API_BASE}/api/v1/users/register`, userDetails, {withCredentials: true}, {
        headers: {"Content-Type": "multipart/form-data"}
      })
      
      setTimeout(() => {
        navigate('/')
      }, 2000);
      
    } catch (error) {
      console.log(error)
    }
  }

  const increaseStepCounter = () => setStepCounter(stepCounter+1)

  return (
    <div className='h-screen w-full bg-[#121212] p-15'>
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