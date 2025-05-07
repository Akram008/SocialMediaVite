import React, { useState } from 'react'
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
import Header from '../../components/Header/Header'
import NavigationTab from '../../components/NavigationTab/NavigationTab'
import axios from 'axios'

const AddPost = () => {
  const [postCreated, setPostCreated] = useState(false)
  const [post, setPost] = useState({
    title: '', 
    content: '', 
    postType: ''
  })

  const handleChange = (e) => {
    setPost({...post, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault() 
    try {
      const response = await axios.post(`${API_BASE}/api/v1/posts/createPost`, post, {withCredentials: true})
      setPost({
        title: '', 
        content: '', 
        postType: ''
      })
    } catch (error) {
      console.log(error)
    }
  }

  const successPopupContainer = () => (
      <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-50 p-5">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-4">Successfully Posted!</h2>
            <button
              onClick={() => setPostCreated(false)}
              className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-700"
            >
              Okay
            </button>
          </div>
      </div>
  )
  
  return (
    <div className='w-full h-screen bg-[#121212]'>
        <Header/>
        {postCreated && successPopupContainer()}
        <form className='w-full flex flex-col items-start px-8 py-5 scroll-auto' onSubmit={handleSubmit}>
            <label htmlFor='title' className='text-lg text-[#c1bcbc] mb-1'>Title</label>
            <input type="text" className='w-60 h-8 p-3 bg-[#686767] outline-0 text-amber-50 rounded-sm border-none mb-6' id='title' name='title' value={post.title} onChange={handleChange} placeholder='Title'/>
            
            <label htmlFor='content' className='text-lg text-[#c1bcbc] mb-1'>Content</label>
            <textarea name="content" onChange={handleChange} cols='35' rows='5' className='p-3 bg-[#686767] rounded-sm border-none outline-0 text-amber-50 mb-6' value={post.content} id="content"></textarea>
            
            <div className='mb-5'>
                <label htmlFor='content-type' className='text-lg text-[#c1bcbc] mb-1 mr-3'>Types: </label>    
                <select id='content-type' className='bg-[#d9d9d9] w-25 p-1 rounded-sm' value={post.postType} name='postType' onChange={handleChange}>
                    <option value='Quotes'>Quotes</option>
                    <option value='Journal'>Journal</option>
                    <option value='Thoughts'>Thoughts</option>
                    <option value='Poetry'>Poetry</option>
                    <option value='Others'>Others</option>
                </select>
            </div>
            <button className='bg-[#c1bcbc] w-20 h-8 text-lg font-medium self-end' onClick={()=> setPostCreated(true)} type='submit'>Post</button>
        </form>
        <NavigationTab/>
    </div>
  )
}

export default AddPost