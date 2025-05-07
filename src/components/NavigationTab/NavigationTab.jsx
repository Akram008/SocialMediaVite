import React from 'react'
import { RiHomeLine } from "react-icons/ri";
import { IoCreateOutline, IoSearchOutline } from "react-icons/io5";
import { PiNotificationFill } from "react-icons/pi";
import { Link, useLocation } from 'react-router-dom';

const NavigationTab = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path
  return (
    <div className='w-full h-15 p-8 bg-[#332f2f] flex flex-row justify-between items-center fixed bottom-0 rounded-t-lg'>
        <Link to='/'>
        <button className={`${isActive('/')? "text-black flex items-center justify-center bg-white text-2xl p-2 rounded-full" : "text-white text-2xl"}`}><RiHomeLine/></button>
        </Link>
        <Link to='/search'>
          <button className={`${isActive('/search')? "text-black bg-white text-2xl p-2 rounded-full " : "text-white bg-transparent text-2xl"} flex items-center justify-center`}><IoSearchOutline/></button>
        </Link>
        <Link to='/addPost'>
        <button className={`${isActive('/addPost')? "text-black flex items-center justify-center bg-white text-2xl p-2 rounded-full" : "text-white text-2xl"}`}><IoCreateOutline/></button>
        </Link>
        <Link to='/notifications'>
        <button className={`${isActive('/notifications')? "text-black flex items-center justify-center bg-white text-2xl p-2 rounded-full" : "text-white text-2xl"}`}><PiNotificationFill/></button>
        </Link>
    </div>
  )
}

export default NavigationTab