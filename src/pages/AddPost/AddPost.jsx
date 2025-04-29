import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import NavigationTab from '../../components/NavigationTab/NavigationTab'
import axios from 'axios'

const AddPost = () => {
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
      const response = await axios.post('/api/v1/posts/createPost', post)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className='w-full h-screen bg-[#121212]'>
        <Header/>
        <form className='w-full flex flex-col items-start px-8 py-5 scroll-auto' onSubmit={handleSubmit}>
            <label htmlFor='title' className='text-lg text-[#c1bcbc] mb-1'>Title</label>
            <input type="text" className='w-60 h-8 p-3 bg-[#686767] rounded-sm border-none mb-6' id='title' name='title' onChange={handleChange} placeholder='Title'/>
            
            <label htmlFor='content' className='text-lg text-[#c1bcbc] mb-1'>Content</label>
            <textarea name="content" onChange={handleChange} cols='35' rows='5' className='p-3 bg-[#686767] rounded-sm border-none mb-6' id="content"></textarea>
            
            <div className='mb-5'>
                <label htmlFor='content-type' className='text-lg text-[#c1bcbc] mb-1 mr-3'>Types: </label>    
                <select id='content-type' className='bg-[#d9d9d9] w-25 p-1 rounded-sm' name='postType' onChange={handleChange}>
                    <option value='Quotes'>Quotes</option>
                    <option value='Journal'>Journal</option>
                    <option value='Thoughts'>Thoughts</option>
                    <option value='Poetry'>Poetry</option>
                    <option value='Others'>Others</option>
                </select>
            </div>

            <button className='bg-[#c1bcbc] w-20 h-8 text-lg font-medium self-end' type='submit'>Post</button>
        </form>
        <NavigationTab/>
    </div>
  )
}

export default AddPost