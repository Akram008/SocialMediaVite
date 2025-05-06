import React, { useEffect, useState } from 'react'
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
import Header from '../../components/Header/Header'
import NavigationTab from '../../components/NavigationTab/NavigationTab'
import NotificationBlock from '../../components/NotificationBlock/NotificationBlock'
import axios from 'axios'

const Notification = () => {
  const [notifications, setNotifications] = useState([]) 

  useEffect(()=>{
    const fetchNotifications = async()=>{
      const res = await axios.get(`${API_BASE}/api/v1/notifications/getUserNotifications`, {withCredentials: true}) 
      setNotifications(res.data.data) 
    }

    fetchNotifications()
  }, [])

  return (
    <div className='w-full min-h-screen bg-[#121212] overflow-auto pb-15'>
        <Header/>
        <h1 className='text-white text-3xl font-semibold pl-8 pt-3'>Notifications</h1>
        <div className='px-8 py-5'>
          {notifications.map(notification => <NotificationBlock key={notification._id} notification={notification} />)}        
        </div>
        <NavigationTab/>
    </div>
  )
}

export default Notification