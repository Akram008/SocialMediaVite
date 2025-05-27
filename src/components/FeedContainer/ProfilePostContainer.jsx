import React, { useEffect, useState } from 'react'
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa"
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
import CommentSection from '../Comments/CommentSection';
import axios from 'axios';
import { useLoggedInUser } from '../../context/LoginUserContext';
import { Link } from 'react-router-dom';

const ProfilePostContainer = (props) => {
  const {loggedInUser} = useLoggedInUser()
  const {post} = props 
  const [postDate, setPostDate] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [totalLikes, setTotalLikes] = useState(0)
  const [totalComments, setTotalcomments] = useState(0)
  const [showComments, setShowComments] = useState(false)
  const [editBtn, setEditBtn] = useState(false)
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(()=>{
    const fetchLike = async ()=>{
      const response = await axios.get(`${API_BASE}/api/v1/likes/isLiked/${post._id}`, {withCredentials: true}) 
      setIsLiked(response.data.data)
    }  

    fetchLike()
  },[])

  useEffect(() => {
    const fetchTotalLikes = async()=>{
      const totalLikes = await axios.get(`${API_BASE}/api/v1/likes/totalLikes/${post._id}`, {withCredentials: true})
      setTotalLikes(totalLikes.data.data)
    }

    fetchTotalLikes()
  }, [isLiked])
  
  const handleDelelte = async () => {
    try {
      const res = await axios.delete(`${API_BASE}/api/v1/posts/deletePost/${post._id}`, {withCredentials: true})
      console.log(res.data)
      setIsDeleted(true)
      setShowDeletePopup(false)
    } catch (error) {
      console.log(`post deletion error: ${error}`)
    } 

  }

  const handleLike = async () =>{
    const likeResponse = await axios.post(`${API_BASE}/api/v1/likes/toggleLike/${post._id}`, {}, {withCredentials: true}) 

    const isLikedResponse = await axios.get(`${API_BASE}/api/v1/likes/isLiked/${post._id}`, {withCredentials: true})
    setIsLiked(isLikedResponse.data.data)
  }


  useEffect(() => {
    if (post?._id) {
      const createdDate = getCreatedDateFromObjectId(post._id);
      setPostDate(createdDate.toLocaleString("en-GB", {
        day: 'numeric', 
        month: 'short', 
        year: 'numeric', 
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }));
    }
  }, []);

  function getCreatedDateFromObjectId(objectId) {
    const timestampHex = objectId.substring(0, 8);
    const timestamp = parseInt(timestampHex, 16) * 1000;
    return new Date(timestamp);
  }

  const isDeletePopup = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-50 p-5">
          <div className="bg-[#121212] p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-4 text-white">Confirmation to delete this post!</h2>
            <button onClick={handleDelelte}
              className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-700"
            >
              Yes
            </button>
            <button onClick={()=> setShowDeletePopup(false)}
              className="px-4 py-2 bg-transparent text-white border-none rounded"
            >
              Cancel
            </button>
          </div>
      </div>
  )

  const deletedPostContainer = () => (
    <div className='w-full bg-stone-400 p-3'>
      <p className='text-gray-900'>This post is successfully deleted!</p>
    </div>
  )

  return (
    <div className='w-full flex flex-col mb-8'>
        <p className='text-lg text-[#686767] font-light italic self-start'>{postDate}</p>
        {showDeletePopup && isDeletePopup()}
        {isDeleted 
          ? 
            deletedPostContainer()
          : 
          (
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

                    <div className='flex items-center gap-2'>
                      {editBtn && <button className='text-md border-1 border-red-600 rounded-lg p-2 text-red-600 bg-white' onClick={() => setShowDeletePopup(true)}>
                        <FaRegTrashAlt/>
                      </button>}

                      {editBtn && <button className='text-md text-emerald-600 bg-white p-2 rounded-lg'>
                        <Link to={`/edit-post/${post._id}`}>
                          <CiEdit/>
                        </Link>
                      </button>}

                      {loggedInUser._id.toLocaleString() === post.createdBy.toLocaleString() && <button className='bg-transparent border-0 flex items-center text-2xl text-white' onClick={()=>setEditBtn(prev => !prev)}>
                        {editBtn ? <RxCross2/> : <HiOutlineDotsHorizontal/>}
                      </button>}
                    </div>
                </div>
          </div>
          )
        }
        <CommentSection showComments={showComments} feedId={post._id} totalCommentsFunc={(commentLen)=>setTotalcomments(commentLen)} showCommentsFunc={()=>setShowComments(!showComments)}/>
    </div>
  )
}

export default ProfilePostContainer