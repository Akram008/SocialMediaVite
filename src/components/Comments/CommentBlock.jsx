import React from 'react'

const CommentBlock = (props) => { 
  const {comment} = props 
  
  return (
    <div className='flex flex-row items-center w-full py-3 px-5 gap-5'> 
        
        <img src={comment.commentedBy.profilePic} alt="profile-pic" className='w-10 h-10 rounded-full' />
        
        <div className='flex flex-col w-85'>
            <p className='text-white'>{comment.comment}</p>
            <p className='text-[#c1bcbc] self-end'>-{comment.commentedBy.username}</p>
        </div>

    </div>
  )
}

export default CommentBlock