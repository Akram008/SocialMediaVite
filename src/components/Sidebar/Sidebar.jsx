import React from 'react'
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
import { RxCross1 } from "react-icons/rx";
import { useSidebarToggle } from '../../context/sidebarContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Sidebar = () => {  
  const {showSidebar, toggleSidebar} = useSidebarToggle()  

  const navigate = useNavigate()

  const onLogout = async () =>{
    try {
        const response = await axios.get(`${API_BASE}/api/v1/users/logout`, {withCredentials: true})
        navigate('/login')
        toggleSidebar()
        window.location.reload()
    } catch (error) {
        console.log(error)
    }
  }  

  return (
    <div  
    className={`fixed top-0 left-0 w-[60%] h-screen bg-[#121212] flex flex-col items-start z-10 p-8 transition-transform duration-500 ${showSidebar ? "translate-x-0" : "-translate-x-full" }`}>
        <button onClick={toggleSidebar}>
            <RxCross1 className='text-white text-3xl'/>
        </button>
        <ul className='mt-15'>
            <Link to='/user-profile' onClick={toggleSidebar}>
                <li className='w-full border-l-4 text-2xl text-white pl-5 mb-8 font-light'>
                    Your Profile
                </li>
            </Link>
            <Link to='/change-password' onClick={toggleSidebar}>
                <li className='w-full border-l-4 text-2xl text-white pl-5 mb-8 font-light'>
                    Change Password
                </li>
            </Link>
            <li className='w-full border-l-4 text-2xl text-white pl-5 mb-8 font-light'>
                Liked Ones
            </li>
            <li className='w-full border-l-4 text-2xl text-white pl-5 font-light'>
                <button className='border-none' onClick={onLogout}>Logout</button>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar