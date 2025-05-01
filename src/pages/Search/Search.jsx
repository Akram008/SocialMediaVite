import React, { useEffect, useState } from 'react'
const API_BASE = import.meta.env.VITE_API_BASE_URL;
import NavigationTab from '../../components/NavigationTab/NavigationTab'
import { IoSearchOutline } from "react-icons/io5";
import SeachProfileContainer from '../../components/SearchProfileContainer/SeachProfileContainer';
import axios from 'axios'

const SearchUser = () => {
  const [searchVal, setSearchVal] = useState('')
  const [fetchedUsers, setFetchedUsers] = useState([])

  useEffect(()=>{
    const fetchUsers = async () => {
      const response = await axios.get(`${API_BASE}/api/v1/users/search?searchedUser=${searchVal}`, {withCredentials: true})
      setFetchedUsers(response.data.data) 
    }
    fetchUsers()
  },[searchVal])

  const handleSearchVal = (e) => {
    setSearchVal(e.target.value)
  }

  return (
    <div className='bg-[#121212] h-screen w-full'>
        <div className='w-full h-full p-10'>
            <div className='w-full h-10 bg-[#c1bcbc] rounded-4xl flex flex-row'>
                <IoSearchOutline className='text-2xl w-[20%] self-center'/>
                <input type='search' value={searchVal} className='w-[80%] rounded-r-4xl outline-0 p-1' onChange={handleSearchVal}  />
            </div>
            {fetchedUsers.length===0? <h1 className='text-center text-3xl mt-10 text-[#c1bcbc]'>No Results!</h1> : (<ul className='mt-10'>
              {fetchedUsers.map(each => <SeachProfileContainer key={each._id} eachUser={each}/>)}     
            </ul>)}
            
        </div>
        <NavigationTab/>
    </div>
  )
}

export default SearchUser