import React, { useState } from 'react'
const API_BASE = import.meta.env.VITE_API_BASE_URL;
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleUsername = (e) => setUsername(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const navigate = useNavigate()

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(`${API_BASE}/api/v1/users/login`, {username: username, password: password}, {withCredentials: true})
      console.log(response) 
      navigate('/')
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='h-screen w-full bg-[#121212] flex flex-col justify-center items-center'>
        <h1 className='text-2xl text-white mb-20'>Project Name</h1>
        <form className='flex flex-col w-full px-15' onSubmit={handleFormSubmit}>
            <label htmlFor='username' className='mb-1 text-white'>Username</label>
            <input type="text" value={username} name="username" onChange={handleUsername} id="username" className='bg-[#e5dede] h-8 mb-5 border-none' />

            <label htmlFor='password' className='mb-1 text-white'>Password</label>
            <input type="password" value={password} name="password" onChange={handlePassword} id="password" className='bg-[#e5dede] h-8 border-none' />

            <button className='rounded-3xl bg-[#686767] py-2 text-xl text-white mt-10' type='submit'>Login</button>
        </form>
        <p className='text-white mt-1'>Don't have an account? <span className='text-[#bd7676]'><Link to='/sign-up'>Sign_up</Link></span></p>
    </div>
  )
}

export default Login