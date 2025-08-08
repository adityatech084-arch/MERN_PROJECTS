import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getSocket } from '../lib/socket';
import { Image, Send, X } from 'lucide-react';
import { sendMessage } from '../store/chatSlice.js';

function MessageInput() {
    const[text,setText]=useState('');
    const[mediaPreview,setMediaPreview]=useState(null);
    const [media,setMedia]=useState(null);
    const[mediaType,setMediatype]=useState("");
    const fileInputRef =useRef(null);
    const dispatch = useDispatch();
    const {selectedUser} = useSelector((state)=>state.chat);

    const handelMediaChange=(e)=>{
        const file = e.target.files[0];
        if(!file) return;
        setMedia(file);
        const type=file.type;
        if(type.startsWith("image/")){
            setMediatype("image");
            const reader = new FileReader();
            reader.onload =()=>{
                setMediaPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }else if(type.startsWith("video/")){
            setMediatype("video");
            const videoUrl = URL.createObjectURL(file);
            setMediaPreview(videoUrl);
        }else{
            toast.error('please select an image or video.')
            setMedia(null)
            setMediaPreview(null)
            setMediatype("");
            return
        }
    }
    


    const removeMedia = () =>{
        setMedia(null);
        setMediaPreview(null);
        setMediatype("");
        if(fileInputRef.current) fileInputRef.current.value = "";
    }

    const handelSendMessage = (e) =>{
        e.preventDefault();
        if(!text.trim() && !media) return;
        const data = new FormData();
        data.append("text",text.trim());
        data.append("media",media);



dispatch(sendMessage(data))

        // reset all
        setText("");
        setMedia(null);
        setMediaPreview(null);
        setMediatype("");
          if(fileInputRef.current) fileInputRef.current.value = "";
    }

useEffect(()=>{
    const socket = getSocket();
    if(!socket) return;
    const handelNewMessage = (newMessage) =>{
        if(newMessage.senderId === selectedUser._id || newMessage.reciverId === selectedUser._id){
            dispatch({type:"chat/pushMessage",payload:newMessage});
        }
    };

    socket.on("newMessage",handelNewMessage);
    return ()=>socket.off('newMessage',handelNewMessage);
},[selectedUser._id])

  return (
    <div className='p-4 w-full'>
        {
            mediaPreview && (
                <div className='mb-3 flex items-center gap-2'>
                    <div className=' relative'>
                        {
                            mediaType === "image" ? (
                                <img src={mediaPreview} alt='Preview'className='w-20 h-20 object-cover rounded-lg border border-gray-700'/>
                            ) :(
                                <video src={mediaPreview} controls className='w-32 h-20 object-cover rounded-lg border border-gray-700'/>
                            )
                        }
                        <button onClick={removeMedia} type='button' className=' absolute -top-2 right-2 w-5 h-5 bg-zinc-800 text-white rounded-full
                        flex items-center justify-center hover:bg-black'>
                            <X className='w-3 h-3'/>
                        </button>
                        </div>
                    </div>
            )
        }



        <form onSubmit={handelSendMessage} className='flex items-center gap-2'>
            <div className=' flex-1 flex gap-2'>
                <input type='text' placeholder='type a message..' 
                className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base'
                value={text}
                onChange={(e)=>setText(e.target.value)}/>

                <input type='file' accept='image/*,video/*' ref={fileInputRef} name='media' className='hidden'onChange={handelMediaChange}/>
                <button type='button'
                onClick={()=>fileInputRef.current.click()}
                className={` sm:flex items-center justify-center w-10 h-10  border border-gray-300 hover:border-blue-400 rounded transition group ${
                    mediaPreview ? "text-emerald-500":"text-gray-400"
                }`} >
                    <Image className='text-sm group-hover:text-blue-400'/>
                </button>
                </div> 

               <button className=' w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50'
               disabled={!text.trim() && !media}>
                <Send size={22}/>
               </button>
        </form>
      
    </div>
  )
}

export default MessageInput
