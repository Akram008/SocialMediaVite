import { useEffect, useState } from "react"
import FeedContainer from "../../components/FeedContainer/FeedContainer.jsx"
import Header from "../../components/Header/Header.jsx"
import NavigationTab from "../../components/NavigationTab/NavigationTab.jsx"
import axios from "axios"
import CommentSection from "../../components/Comments/CommentSection.jsx"

const Home = ()=>{
    const [feedPosts, setFeedPosts] = useState([])

    useEffect(()=>{
        const fetchedPosts = async() => {
            const response = await axios.get('https://social-media-backend-1-vek9.onrender.com/api/v1/posts/feedPosts')
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