import React from 'react'
import { RiHomeLine } from "react-icons/ri";
import { IoCreateOutline, IoSearchOutline } from "react-icons/io5";
import { PiNotificationFill } from "react-icons/pi";
import { Link, NavLink } from 'react-router-dom';

const NavigationTab = () => {
  return (
    <div className='w-full h-15 p-8 bg-[#332f2f] flex flex-row justify-between items-center fixed bottom-0 rounded-t-lg'>
        <Link to='/'>
        <button className='text-white text-2xl'><RiHomeLine/></button>
        </Link>
        <Link to='/search'>
          <button className='text-white text-2xl'><IoSearchOutline/></button>
        </Link>
        <Link to='/addPost'>
        <button className='text-white text-2xl'><IoCreateOutline/></button>
        </Link>
        <Link to='/notifications'>
        <button className='text-white text-2xl'><PiNotificationFill/></button>
        </Link>
    </div>
  )
}

export default NavigationTab