import {React, useEffect, useState } from "react"
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
import FeedContainer from "../../components/FeedContainer/FeedContainer.jsx"
import Header from "../../components/Header/Header.jsx"
import NavigationTab from "../../components/NavigationTab/NavigationTab.jsx"
import axios from "axios"
import CommentSection from "../../components/Comments/CommentSection.jsx"

const Home = ()=>{
    const [feedPosts, setFeedPosts] = useState([])

    useEffect(()=>{
        const fetchedPosts = async() => {
            const response = await axios.get(`${API_BASE}/api/v1/posts/feedPosts`, {withCredentials: true})
            setFeedPosts(response.data.data)
        }
        fetchedPosts()
    },[])

    return(
        <div className="w-full min-h-screen bg-[#121212] overflow-auto pb-15">
            <Header/>
            <div className="w-full px-8 py-5">
                {feedPosts.map((feed)=> <FeedContainer key={feed._id} feed={feed} />)}
            </div>
            <NavigationTab/>
        </div>
    )
}

export default Home