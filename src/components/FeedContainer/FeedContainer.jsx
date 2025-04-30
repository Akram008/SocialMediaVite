import React, { useEffect, useState } from 'react'
const API_BASE = import.meta.env.VITE_API_BASE_URL;
import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa"
import axios from 'axios';
import CommentSection from '../Comments/CommentSection';

const FeedContainer = (props) => {
  const [isLiked, setIsLiked] = useState(false)
  const [totalLikes, setTotalLikes] = useState(0)
  const [totalComments, setTotalcomments] = useState(0)
  const [showComments, setShowComments] = useState(false)

  const {feed} = props

  useEffect(()=>{
    const fetchLike = async ()=>{
      const response = await axios.get(`${API_BASE}/api/v1/likes/isLiked/${feed._id}`, {withCredentials: true}) 
      setIsLiked(response.data.data)
    }  

    fetchLike()
  },[])

  useEffect(() => {
    const fetchTotalLikes = async()=>{
      const totalLikes = await axios.get(`${API_BASE}/api/v1/likes/totalLikes/${feed._id}`, {withCredentials: true})
      setTotalLikes(totalLikes.data.data)
    }

    fetchTotalLikes()
  }, [isLiked])
  

  const handleLike = async () =>{
    const likeResponse = await axios.post(`${API_BASE}/api/v1/likes/toggleLike/${feed._id}`, {withCredentials: true}) 

    const isLikedResponse = await axios.get(`/api/v1/likes/isLiked/${feed._id}`, {withCredentials: true})
    setIsLiked(isLikedResponse.data.data)
  }

  return (
    <>
    <div className='w-full bg-[#333333] rounded-lg flex flex-col p-5 mb-10 gap-5'>
        
        <div className='w-full flex flex-row justify-between items-center '>
            <h3 className='text-[#faf9f6] w-30 font-bold'>{feed.title}</h3>
            <p className='text-[#faf9f6] opacity-50'>Type: {feed.postType}</p>
        </div>
        
        <p className='w-full text-[#f9f6ee] text-xl text-center border-t-1 border-b-1 py-5'>"{feed.content}"</p>
        
        <div className='flex flex-row justify-between items-center'>
        
            <div className='flex flex-row items-center gap-6'>
        
                <button className='text-2xl text-white flex flex-col items-center gap-2' onClick={handleLike}>
                  {isLiked?<BsHandThumbsUpFill/>:<BsHandThumbsUp/>} 
                  <p className='text-sm'>{totalLikes}</p>
                </button>

                <button className='text-2xl text-white flex flex-col items-center gap-2' onClick={()=>setShowComments(!showComments)}>
                  <FaRegComment/> 
                  <p className='text-sm'>{totalComments}</p>
                </button>
        
            </div>
        
            <p className='text-white text-center leading-4'>Writer:<br/><span className='font-bold'>@{feed.createdBy.username}</span></p>
        
        </div>
        
          <CommentSection showComments={showComments} feedId={feed._id} totalCommentsFunc={(commentLen)=>setTotalcomments(commentLen)} showCommentsFunc={()=>setShowComments(!showComments)}/>
    
    </div>
    </>
  )
}

export default FeedContainer