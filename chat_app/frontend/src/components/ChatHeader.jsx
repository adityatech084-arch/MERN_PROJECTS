import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import avtarImg from "../assets/user.jpg";
import { setSelectedUser } from '../store/chatSlice';
import { X } from 'lucide-react';
function ChatHeader() {
    const {selectedUser} = useSelector((state)=>state.chat);
    const {onlineusers} = useSelector((state)=>state.auth);
   const dispatch = useDispatch();
  return (
    <div className='p-3 border-b bg-gray-200 ring-1 ring-gray-300'>
      <div className='flex items-center justify-between'>
        {/* user info */}
        <div className='flex items-center gap-3'>
            {/* avatar */}
            <div className=' relative w-10 h-10'>
                <img src={selectedUser?.avatar?.url || avtarImg}
                alt={avtarImg}
                className='w-full h-full object-cover rounded-full'/>
                {
                    onlineusers.includes(selectedUser._id) && (
                        <span className=' absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-white border-2 rounded-full'/>
                    )
                }
            </div>

            {/* name and status */}
            <div>
                <h3 className='font-medium text-base text-black'>
                    {selectedUser?.fullName}
                </h3>
                <p className='text-sm text-black'>
                    {onlineusers.includes(selectedUser?._id) ? "online" : "offline"}
                </p>
            </div>
        </div>

        {/* chat button */}
        <button onClick={()=>dispatch(setSelectedUser(null))} className='text-gray-800 hover:text-black transition'>
            <X className='w-5 h-5'/>
        </button>
      </div>
    </div>
  )
}

export default ChatHeader
