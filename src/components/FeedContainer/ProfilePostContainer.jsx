import React, { useEffect, useState } from 'react'
const API_BASE = import.meta.env.VITE_API_BASE_URL;
import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa"
import CommentSection from '../Comments/CommentSection';
import axios from 'axios';

const ProfilePostContainer = (props) => {
  const {post} = props 
  const [postDate, setPostDate] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [totalLikes, setTotalLikes] = useState(0)
  const [totalComments, setTotalcomments] = useState(0)
  const [showComments, setShowComments] = useState(false)

  useEffect(()=>{
    const fetchLike = async ()=>{
      const response = await axios.get(`${API_BASE}/api/v1/likes/isLiked/${post._id}`) 
      setIsLiked(response.data.data)
    }  

    fetchLike()
  },[])

  useEffect(() => {
    const fetchTotalLikes = async()=>{
      const totalLikes = await axios.get(`${API_BASE}/api/v1/likes/totalLikes/${post._id}`)
      setTotalLikes(totalLikes.data.data)
    }

    fetchTotalLikes()
  }, [isLiked])
  

  const handleLike = async () =>{
    const likeResponse = await axios.post(`${API_BASE}/api/v1/likes/toggleLike/${post._id}`) 

    const isLikedResponse = await axios.get(`${API_BASE}/api/v1/likes/isLiked/${post._id}`)
    setIsLiked(isLikedResponse.data.data)
  }


  useEffect(() => {
    if (post?._id) {
      const createdDate = getCreatedDateFromObjectId(post._id);
      setPostDate(createdDate.toLocaleString());
    }
  }, []);

  function getCreatedDateFromObjectId(objectId) {
    const timestampHex = objectId.substring(0, 8);
    const timestamp = parseInt(timestampHex, 16) * 1000;
    return new Date(timestamp);
  }

  return (
    <div className='w-full flex flex-col mb-8'>
        <p className='text-lg text-[#686767] font-light italic self-start'>{postDate}</p>
        <div className='w-full bg-[#333333] rounded-lg flex flex-col p-5 gap-5'>
                <div className='w-full flex flex-row justify-between items-center '>
                    <h3 className='text-[#faf9f6] w-30 font-bold'>{post.title}</h3>
                    <p className='text-[#faf9f6] opacity-50'>Type: {post.postType}</p>
                </div>
                <p className='w-full text-[#f9f6ee] text-xl text-center border-t-1 border-b-1 py-5'>"{post.content}"</p>
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
                </div>
        </div>
        <CommentSection showComments={showComments} feedId={post._id} totalCommentsFunc={(commentLen)=>setTotalcomments(commentLen)} showCommentsFunc={()=>setShowComments(!showComments)}/>
    </div>
  )
}

export default ProfilePostContainer