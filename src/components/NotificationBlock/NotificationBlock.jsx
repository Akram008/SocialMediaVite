import React from 'react'

const NotificationBlock = (props) => {
  const {notification} = props 

  let title = ''
   
  switch (notification.notificationType) {
    case 'Like':
        title = `${notification.byUser.username} liked your post "${notification.postId.title}"`
        break;
    case 'Comment':
        title = `${notification.byUser.username} commented on your post "${notification.postId.title}"` 
        break;
    default:
        break;
  }

  return (
    <>
    <div className='w-full flex flex-row items-center gap-5 p-5'>
        <img src={notification.byUser.profilePic} className='h-10 w-10 rounded-full'/> 
        <div className='flex flex-col items-start'>
            <p className='text-[#e5dede] text-sm font-semibold'>{title}</p>
            <p className='text-white'>{notification.content}</p>
        </div>
    </div>
    <hr className='text-white h-10 my-5'/>
    </>
  )
}

export default NotificationBlock