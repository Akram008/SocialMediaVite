import React from 'react'
import { GrFormNextLink } from "react-icons/gr";

const Part1 = ({handleChange, increaseStepCounter, userDetails}) => {
  return (
    <div className='flex flex-col'>
        <label htmlFor='firstName' className='mb-1 text-white'>First Name</label>
        <input type='text' className='bg-[#e5dede] h-8 mb-5 border-none p-2' value={userDetails.firstName} name='firstName' onChange={handleChange} id='firstName' placeholder='First Name'/>
        <label htmlFor='lastName' className='mb-1 text-white'>Last Name</label>
        <input type='text' className='bg-[#e5dede] h-8 border-none p-2' name='lastName' value={userDetails.lastName} onChange={handleChange} id='lastName' placeholder='Last Name'/>
        <button className='text-white bg-transparent border-none text-2xl mt-5 flex items-center' onClick={increaseStepCounter}>Next <GrFormNextLink/></button> 
    </div>
  )
}

export default Part1