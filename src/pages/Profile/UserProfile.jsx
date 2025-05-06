import React, { useEffect, useState } from 'react'
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import './index.css'
import ProfilePostContainer from '../../components/FeedContainer/ProfilePostContainer';
import { useLoggedInUser } from '../../context/LoginUserContext';
import axios from 'axios';

const UserProfile = () => {
  const {loggedInUser} = useLoggedInUser()
  const [posts, setPosts] = useState([])
  const [tracksData, setTracksData] = useState({
      trackers: 0, 
      trackings: 0
  })

  useEffect(() => {
    ;(async () => {
      const response = await axios.get(`${API_BASE}/api/v1/posts/loggedInUserPosts`, {withCredentials: true})
      setPosts(response.data.data)
    })()
  }, [])

  useEffect(()=>{
    const fetchUserTracks = async()=>{
        const trackersResponse = await axios.get(`${API_BASE}/api/v1/tracks/loggedInUserTrackers`, {withCredentials: true}) 
        const trackingsResponse = await axios.get(`${API_BASE}/api/v1/tracks/loggedInUserTrackings`, {withCredentials: true}) 
        
        setTracksData({trackers: trackersResponse.data.data, trackings: trackingsResponse.data.data})
    }

    fetchUserTracks()
  },[])
  
  return (
    <div className='user-profile-container w-full min-h-screen bg-[#121212] flex flex-col items-start p-2'>
        <div className='flex justify-start items-center p-5'>
          <Link to="/" className='text-white text-2xl'><FaArrowLeftLong/></Link>
        </div>
        <div className='w-full h-40 flex flex-col justify-center items-center gap-4 px-5'>
          <div className='w-20 h-20 rounded-full bg-black flex justify-center items-center'>
              <img src={loggedInUser.profilePic} className='h-full rounded-full' />
          </div>
          <button className='text-[#e5dede] bg-transparent border-1 border-[#e5dede] px-3 py-1 rounded-md text-sm self-end'>Edit Profile</button>
        </div>
        <div className='p-5 w-full'>
          <h1 className='text-[#e5dede] font-light text-2xl mb-0'>{loggedInUser.firstName} {loggedInUser.lastName}</h1>
          <p className='text-[#545454] font-semibold mt-none text-xl italic'>@{loggedInUser.username}</p>

          <div className='w-full flex justify-between items-center py-5 pr-2'>
            <p className='text-[#d9d9d9] text-xl font-semibold '>Trackers: {tracksData.trackers}</p>
            <p className='text-[#d9d9d9] text-xl font-semibold '>Tracking: {tracksData.trackings}</p>
          </div>

          <h3 className='text-xl text-white font-semibold'>Bio:</h3>
          <p className='text-lg text-[#c1bcbc]'>{loggedInUser.bio}</p>
        </div>
        <div className='p-5'>
          {posts.map(post => <ProfilePostContainer key={post._id} post={post}/>)}
        </div>
    </div>
  )
}

export default UserProfile