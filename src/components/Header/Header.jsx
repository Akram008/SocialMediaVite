import {React, useContext} from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import {useSidebarToggle} from '../../context/sidebarContext';
import { useLoggedInUser } from '../../context/LoginUserContext';


const Header = () => {
  const {showSidebar, toggleSidebar} = useSidebarToggle()
  const {loggedInUser} = useLoggedInUser()
  return (
    <div className='bg-[#121212] w-full h-20 flex p-8 flex-row justify-between items-center'>
        <button className='text-4xl' onClick={toggleSidebar}>
            <RxHamburgerMenu className='text-zinc-50'/>
        </button>
        <h1 className="text-white text-center text-sm font-medium italic leading-none">THE QUIET<br/> PAGE</h1>
        <div className='w-10 h-10 flex justify-center items-center rounded-full bg-white'><img className='rounded-full h-full' src={loggedInUser.profilePic}/></div>
    </div>
  )
}

export default Header