import React from 'react'
import { GrFormNextLink } from "react-icons/gr";

const Part2 = ({handleChange, increaseStepCounter, userDetails}) => {
  return (
    <div className='flex flex-col items-start'>
        <label htmlFor='username' className='mb-1 text-white'>Username</label>
        <input type='text' className='bg-[#e5dede] h-8 border-none p-2 w-full' value={userDetails.username} name='username' onChange={handleChange} id='username' placeholder='Username'/>
        <button className='text-white bg-transparent border-none text-2xl mt-5 flex items-center' onClick={increaseStepCounter}>Next <GrFormNextLink/></button> 
    </div>
  )
}

export default Part2