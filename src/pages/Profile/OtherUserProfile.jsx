import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useParams, useNavigate} from 'react-router-dom';
import './index.css'
import ProfilePostContainer from '../../components/FeedContainer/ProfilePostContainer';
import axios from 'axios';

const OtherUserProfile = () => {
    const {userId} = useParams() 
    const [userData, setUserData] = useState({}) 
    const [userPosts, setUserPosts] = useState([])
    const [isTracked, setIsTracked] = useState(false)
    const [tracksData, setTracksData] = useState({
        trackers: 0, 
        trackings: 0
    })

    const navigate = useNavigate()

    useEffect(()=>{
        const fetchUserData = async() => {
            const response = await axios.get(`/api/v1/users/${userId}`)
            setUserData(response.data.data)

            const postsResponse = await axios.get(`/api/v1/posts/userPosts/${userId}`)
            setUserPosts(postsResponse.data.data)

            const isTrackResponse = await axios.get(`/api/v1/tracks/isTrack/${userId}`)
            setIsTracked(isTrackResponse.data.data)
        }
        

        fetchUserData()
        
    }, [])

    useEffect(()=>{
        const fetchUserTracks = async()=>{
            const trackersResponse = await axios.get(`/api/v1/tracks/userTrackers/${userId}`) 
            const trackingsResponse = await axios.get(`/api/v1/tracks/userTrackings/${userId}`) 
            
            setTracksData({trackers: trackersResponse.data.data, trackings: trackingsResponse.data.data})
        }

        fetchUserTracks()
    },[isTracked])

    const handleTrack = async () =>{
        const response = await axios.post(`/api/v1/tracks/trackUser/${userId}`) 

        const isTrackResponse = await axios.get(`/api/v1/tracks/isTrack/${userId}`)
        setIsTracked(isTrackResponse.data.data)
    }

    const trackButton = () => {
        return isTracked ? <button className='bg-transparent border-2 border-[#e5dede] text-[#e5dede] font-bold py-1 px-3 rounded-2xl self-end duration-700' onClick={handleTrack}>Tracked</button> : <button className='bg-[#e5dede] border-none py-1 px-3 font-bold rounded-2xl self-end duration-700' onClick={handleTrack}>Track</button>
    }

    console.log(tracksData)


  return (
    <div className='user-profile-container w-full min-h-screen bg-[#121212] flex flex-col items-start p-2'>
    <div className='flex justify-start items-center p-5'>
      <button className='text-white text-2xl' onClick={()=> navigate(-1)}><FaArrowLeftLong/></button>
    </div>
    <div className='w-full h-40 flex flex-col justify-center items-center gap-4 px-5'>
      <div className='w-20 h-20 rounded-full bg-black flex justify-center items-center'>
          <img src={userData.profilePic} className='h-full rounded-full' />
      </div>
      {trackButton()}
    </div>
    <div className='p-5 w-full'>
      <h1 className='text-[#e5dede] font-light text-2xl mb-0'>{userData.firstName} {userData.lastName}</h1>
      <p className='text-[#545454] font-semibold mt-none text-xl italic'>@{userData.username}</p>

      <div className='w-full flex justify-between items-center py-5 pr-2'>
        <p className='text-[#d9d9d9] text-xl font-semibold '>Trackers: {tracksData.trackers}</p>
        <p className='text-[#d9d9d9] text-xl font-semibold '>Tracking: {tracksData.trackings}</p>
      </div>

      <h3 className='text-xl text-white font-semibold'>Bio:</h3>
      <p className='text-lg text-[#c1bcbc]'>{userData.bio}</p>
    </div>
    <div className='p-5 for-posts'>
        {userPosts.map(post => <ProfilePostContainer key={post._id} post={post}/>)}
    </div>
</div>
  )
}

export default OtherUserProfile