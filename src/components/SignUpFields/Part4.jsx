import React from 'react'
import { GrFormNextLink } from "react-icons/gr";

const Part4 = ({handleChange, handleFileChange, userDetails, previewProfile}) => {
  return (
    <div className='w-full flex flex-col items-start'>
        <div className='bg-[#e5dede] w-20 h-20 rounded-full relative self-center'>
            <input type='file' name='profilePic' onChange={handleFileChange} id='profileImg' className='absolute top-0 left-0 w-full h-full rounded-full bg-amber-200 opacity-0' />
            <div className='w-full h-full rounded-full flex justify-center items-center'>
              {userDetails.profilePic === ''? <p className='text-4xl font-bold'>+</p> : <img src={previewProfile} className='w-auto h-full rounded-full' />}
            </div>
        </div>
        <label htmlFor='profileImg' className='text-white mt-2 self-center'>Profile</label>

        <label htmlFor='bio' className='text-white mb-2 mt-5'>Bio</label>
        <textarea value={userDetails.bio} name='bio' onChange={handleChange} className='bg-[#e5dede] border-none p-2 w-full' id='bio' rows='5' cols='30' placeholder='Write about yourself...'></textarea>
        <button type='submit' className='text-white bg-transparent border-none text-2xl flex items-center mt-5'>Finish <GrFormNextLink/></button>
    </div>
  )
}

export default Part4