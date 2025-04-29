import React from 'react'
import { GrFormNextLink } from "react-icons/gr";

const Part3 = ({handleChange, increaseStepCounter, userDetails}) => {
  return (
    <div className='w-full flex flex-col items-start'>
        <label htmlFor='email' className='mb-1 text-white'>Email</label>
        <input type='text' value={userDetails.email} name='email' onChange={handleChange} id='email' placeholder='xyz@gmail.com' className='bg-[#e5dede] h-8 border-none p-2 w-full mb-5'  />
        <label htmlFor='password' className='mb-1 text-white'>Password</label>
        <input type='password' value={userDetails.password} name='password' onChange={handleChange} id='password' placeholder='Password' className='bg-[#e5dede] h-8 border-none p-2 w-full mb-5'  />
        <label htmlFor='confirmPass' className='mb-1 text-white'>Confirm Password</label>
        <input type='password' name='confirmPassword' id='confirmPass' placeholder='Confirm Password' className='bg-[#e5dede] h-8 border-none p-2 w-full'  />
        <button className='text-white bg-transparent border-none text-2xl mt-5 flex items-center' onClick={increaseStepCounter}>Next <GrFormNextLink/></button> 
    </div>
  )
}

export default Part3