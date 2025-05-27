import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useParams, useNavigate} from 'react-router-dom';
import { MdDone } from "react-icons/md";
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const postType = [
    {
        name: 'Quotes', 
        value: 'Quotes'
    },
    {
        name: 'Journal', 
        value: 'Journal'
    },
    {
        name: 'Thoughts', 
        value: 'Thoughts'
    },
    {
        name: 'Poetry', 
        value: 'Poetry'
    },
    {
        name: 'Others', 
        value: 'Others'
    },
]

const EditPost = () => {
   const {postId} = useParams() 
   const [postData, setPostData] = useState({
    title: '', 
    content: '', 
    postType: ''
   })
   const [updateSuccess, setUpdateSuccess] = useState(true)

   const navigate = useNavigate()

   useEffect(()=>{
    const fetchPostDetails = async()=>{
        const res = await axios.get(`${API_BASE}/api/v1/posts/post/${postId}`, {withCredentials: true}) 
        setPostData({
            title: res.data.data.title, 
            content: res.data.data.content, 
            postType: res.data.data.postType, 
        })
    }

    fetchPostDetails()
   }, [])
   console.log(postData)

   const handlePostDataChange = (e) => {
    setPostData({...postData, [e.target.name]: e.target.value})
   }

   const handleUpdateDone = () => {
    setUpdateSuccess(false) 
    navigate('/user-profile')
   }

   const handleSubmit = async(e) => {
    e.preventDefault()

    try {
        const updateRes = await axios.patch(`${API_BASE}/api/v1/posts/updatePost/${postId}`, postData, {withCredentials: true})  
        console.log(updateRes.data.data)
    } catch (error) {
        console.log(error)
    }
   }

   const successUpdatePopup = () => (
    <div className='fixed left-0 top-0 h-screen w-full bg-black/75 flex justify-center items-center p-3'> 
        <div className='w-full flex flex-col items-center gap-2 rounded-2xl bg-gray-900 p-3'>
            <h1 className='text-4xl text-emerald-300 border-1 border-emerald-300 rounded-full bg-transparent p-3 mb-3'><MdDone /></h1>
            <p className='text-sky-600 text-xl font-semibold'>Post Updated!</p>
            <button className='py-2 px-5 text-emerald-500 bg-transparent hover:cursor-pointer' onClick={handleUpdateDone}>Done</button>
        </div>
    </div>
   )

  return (
    <div className='h-screen w-full bg-[#121212] p-5 '>
        <div className='flex justify-start items-center p-5 w-full h-1/10'>
            <Link to="/user-profile" className='text-white text-2xl'><FaArrowLeftLong/></Link>
        </div>
        {updateSuccess && successUpdatePopup()}
        <form className='w-full text-white flex flex-col gap-2 p-5 h-9/10' onSubmit={handleSubmit}>
            <label htmlFor='postTitle' className='text-neutral-400 font-semibold'>Title</label>
            <input type='text' className='mb-3 border-b-1 border-gray-500' name='title' onChange={handlePostDataChange} value={postData.title} id='postTitle' placeholder='Title'/>
            
            <label htmlFor='postType' className='text-neutral-400 font-semibold'>Type: </label>
            <select name="postType" onChange={handlePostDataChange} className='w-1/2 mb-3' id="postType" value={postData.postType}>
                {postType.map(each => <option value={each.value} className='text-black' key={each.value}>{each.name}</option>)}
            </select>

            <label htmlFor='postContent' className='text-neutral-400 font-semibold'>Content</label>
            <textarea id='postContent' name='content' onChange={handlePostDataChange} className='border-b-1 border-gray-500' rows={5} value={postData.content} placeholder='Content'></textarea>

            <button type='submit' className='mt-auto text-neutral-100 border-1 self-end border-neutral-100 py-2 px-5 rounded-3xl'>Update</button>
        </form>
    </div>
  )
}

export default EditPost