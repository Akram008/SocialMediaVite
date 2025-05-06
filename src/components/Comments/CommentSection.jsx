import React, { useEffect, useState } from 'react'
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
import { FaArrowRight } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import CommentBlock from './CommentBlock';
import axios from 'axios';

const CommentSection = (props) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [latestComment, setLatestComment] = useState({})

  const {showCommentsFunc, showComments, feedId, totalCommentsFunc} = props  

  useEffect(()=>{
    const fetchComments = async () => {
        const commentsResponse = await axios.get(`${API_BASE}/api/v1/comments/getComments/${feedId}`, {withCredentials: true}) 
        setComments(commentsResponse.data.data)  
    }

    fetchComments()
  }, [latestComment])

  const onToggleComments = () =>{
    showCommentsFunc()
  }  

  

  useEffect(()=>{
    totalCommentsFunc(comments.length)
  }, [comments])

  const handleCommentIpt = (e) => {
    setNewComment(e.target.value)
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault() 

    const newCommentRes = await axios.post(`${API_BASE}/api/v1/comments/addComment/${feedId}`, {comment: newComment}, {withCredentials: true}) 
    setLatestComment(newCommentRes.data.data)
    setNewComment('')
  }
  return (
        <div className={`w-full h-100 bg-[#332f2f] fixed left-0 right-0 bottom-0 rounded-t-2xl z-20 transform ease-in-out transition-transform duration-300 ${showComments ? 'translate-y-0' : "translate-y-full"}`}>
            
            <div className='flex flex-row justify-between items-center'>
                <h1 className='p-4 text-white font-semibold text-2xl'>Comments</h1>
                <button className='p-4 text-white' onClick={onToggleComments}><RxCross2/></button>
            </div>
            
            <hr className='text-white h-1'/>

            <div className='overflow-y-scroll h-[calc(100%-160px)]'>
                {comments.map(each => (<CommentBlock key={each._id} comment={each}/>))}
            </div>

            <form className='w-full flex flex-row items-center justify-between px-5 py-2 bg-[#545454] fixed bottom-0' onSubmit={handleCommentSubmit}>
                <input type='text' value={newComment} onChange={handleCommentIpt} className='bg-[#332f2f] text-white rounded-xl p-3 w-[70%]' placeholder='write here...'/>
                <button className='text-2xl' type='submit'><FaArrowRight/></button>
            </form>
            
        </div>
  )
}

export default CommentSection