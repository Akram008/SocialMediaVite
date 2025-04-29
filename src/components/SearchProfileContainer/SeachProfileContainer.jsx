import React from 'react'
import { Link } from 'react-router-dom'

const SeachProfileContainer = (props) => {
  const {eachUser} = props 

  return (
    <Link to={`/user-profile/${eachUser._id}`}>
      <li className='w-full flex flex-row items-center gap-5 p-2 mb-3'>
          <img src={eachUser.profilePic} className='w-10 h-10 rounded-full' />
          <div>
              <p className='text-[#ffffff]'>{eachUser.username}</p>
              <p className='text-[#332f2f]'>{eachUser.firstName} {eachUser.lastName}</p>
          </div>
      </li>
    </Link>
  )
}

export default SeachProfileContainer