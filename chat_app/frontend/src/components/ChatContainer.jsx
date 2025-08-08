import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getMessages } from '../store/chatSlice';
import { getSocket } from '../lib/socket';
import ChatHeader from './ChatHeader';
import MessageSkeleton from './MessageSkeleton';
import MessageInput from './MessageInput';
import avatarImg from "../assets/user.jpg";
import messageSound from '../assets/popup.mp3'
import { Download } from 'lucide-react';
function ChatContainer() {
  const {isMessageLoading,messages,selectedUser} = useSelector((state)=>state.chat);
  

  const {authUser} = useSelector((state)=>state.auth);
  const dispatch= useDispatch();
   const messageEndref = useRef(null);


   useEffect(()=>{

   dispatch(getMessages(selectedUser._id));
   },[selectedUser._id])

   useEffect(()=>{
if(messageEndref.current && messages){
  messageEndref.current.scrollIntoView({behavior:"smooth"});
}
   },[messages])

const playMessageSound = () => {
  const audio = new Audio(messageSound);
  audio.play().catch(err => {
    console.warn('Sound play failed:', err);
  });
};
function fromatMessageTime(date){
  return new Date(date).toLocaleTimeString('en-us',{
    hour:"2-digit",
    minute:"2-digit",
    hour12:false,
  })
}

useEffect(()=>{
  if(!selectedUser?._id) return;
  dispatch(getMessages(selectedUser._id));
  const socket = getSocket();
  if(!socket) return;
     const handelNewMessage = (newMessage) =>{
        if(newMessage.senderId === selectedUser._id || newMessage.reciverId === selectedUser._id){
          dispatch({ type: "chat/pushNewMessage", payload: newMessage });
            if (newMessage.senderId !== authUser._id) {
        playMessageSound();
      }
        }
    };

    socket.on("newMessage",handelNewMessage);
    return ()=>socket.off('newMessage',handelNewMessage);

},[selectedUser._id]);


if(isMessageLoading){
  return (
    <div className='flex flex-1 flex-col overflow-auto'>
      <ChatHeader/>
      <MessageSkeleton/>
      <MessageInput/>
    </div>
  )
}

  return (
    <div className='flex flex-1 flex-col overflow-hidden bg-white'>
     <ChatHeader/>
     {/* message */}
   <div className='flex flex-1 overflow-y-auto p-4 flex-col gap-6'>
  {
    messages?.length > 0 && messages.map((message, idx) => {
      const isSender = message.senderId === authUser._id;
      return (
        <div
          key={message._id || idx}
          className={`flex ${isSender ? "justify-end" : "justify-start"}`}
          ref={idx === messages.length - 1 ? messageEndref : null}
        >
          <div className={`flex items-end ${isSender ? "flex-row-reverse" : "flex-row"} gap-2 `}>
            {/* avatar */}
            <div className='w-8 h-8 rounded-full overflow-hidden border shrink-0'>
             
 <img
  src={
    isSender
      ? authUser?.avatar?.url || avatarImg
      : selectedUser?.avatar?.url || avatarImg
  }
  alt="User avatar"
  className="w-full h-full object-cover"
/>

            </div>

            {/* message bubble */}
            <div
              className={`px-4 py-2 rounded-xl text-sm break-words   ${
                isSender
                  ? "bg-blue-400/20 text-black"
                  : "bg-gray-200 text-black"
              }`}
            >
              {message.media && (
                <>
                <div className="max-w-lg">
                  {message.media.includes(".mp4") ||
                  message.media.includes(".webm") ||
                  message.media.includes(".mov") ? (
                    <video
                      src={message.media}
                      controls
                      className='w-full  rounded-md mb-2'
                    />
                  ) : (
                    <img
                      src={message.media}
                      alt='Attachment'
                      className=' w-md  rounded-md mb-2'
                    />
                  )}
                  
              <a href={message.media.replace('/upload/', '/upload/fl_attachment/')}>
  <Download size={15} className="text-blue-400" />
</a>
</div>

                </>
              )}

              {message.text && <p>{message.text}</p>}

              <span className='block text-[10px] mt-1 text-right text-gray-400'>
                {fromatMessageTime(message.createdAt)}
              </span>
            </div>
          </div>
        </div>
      );
    })
  }
</div>


     <MessageInput/>
    </div>
  )
}

export default ChatContainer
