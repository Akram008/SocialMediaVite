import {React, useEffect, useState } from "react"
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
import FeedContainer from "../../components/FeedContainer/FeedContainer.jsx"
import Header from "../../components/Header/Header.jsx"
import NavigationTab from "../../components/NavigationTab/NavigationTab.jsx"
import axios from "axios"
import CommentSection from "../../components/Comments/CommentSection.jsx"

const Home = ()=>{
    const [feedPosts, setFeedPosts] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(()=>{
        const fetchedPosts = async() => {
            const response = await axios.get(`${API_BASE}/api/v1/posts/feedPosts`, {withCredentials: true})
            setFeedPosts(response.data.data)
        }
        fetchedPosts()
        setLoader(false)
    },[])

    const loaderContainer = () => {
        return ( 
            <div className='bg-[#121212] h-screen w-full flex items-center justify-center'>
                <div className='w-12 h-12 border-4 border-gray-500 border-t-transparent rounded-full animate-spin'></div>
            </div> 
        )
    } 


    return(
        <div className="w-full min-h-screen bg-[#121212] overflow-auto pb-15">
            <Header/>
            {loader ? loaderContainer() : (
            <div className="w-full px-8 py-5">
                {feedPosts.map((feed)=> <FeedContainer key={feed._id} feed={feed} />)}
            </div>
            )}
            <NavigationTab/>
        </div>
    )
}

export default Home